import { config } from "dotenv";
import fetch from 'node-fetch';

config();

let lidarrUrl = process.env.LIDARR_URL || `http://localhost:8686`;
if (lidarrUrl.endsWith(`/`))
    lidarrUrl = lidarrUrl.slice(0, -1);

const apiKey = process.env.LIDARR_API_KEY;
const unmonitor = process.env.UNMONITOR || `false`;
const printUnmonitored = process.env.OUTPUT_UNMONITORED || `false`;
const doDelete = process.env.DELETE || `false`;

try
{
    let apiCheck = await fetch(`${ lidarrUrl }/api?apikey=${ apiKey }`);
    apiCheck = await apiCheck.json();
    if (!Object.prototype.hasOwnProperty.call(apiCheck, `current`))
        throw new Error(`Lidarr API is not available. Do you have the right URL & API Key?`);
}
catch
{
    console.log(`Lidarr API is not available. Do you have the right URL & API Key?`);
    process.exit(1);
}

let artists = await fetch(`${ lidarrUrl }/api/v1/artist?apikey=${ apiKey }`);
artists = await artists.json();

const artistIdsObject = artists.map((artist) => artist.id); // Used to be artist.artistMetadataId but it wasn't returning the correct results?

for (const artistId of artistIdsObject)
{
    let albums = await fetch(`${ lidarrUrl }/api/v1/album?artistId=${ artistId }&includeAllArtistAlbums=true&apikey=${ apiKey }`);
    albums = await albums.json();
    let singles = albums.filter((album) => album.albumType === `Single`);
    singles = printUnmonitored === `true` ? singles.filter((album) => album.monitored === false) : singles.filter((album) => album.monitored === true);

    let everythingElse = albums.filter((album) => album.albumType !== `Single`);
    everythingElse = everythingElse.filter((album) => album.monitored === true);

    const singleNamesLower = [];
    const singleNames = [];
    const singleIds = [];
    for (const single of singles)
    {
        singleNamesLower.push(single.title.toLowerCase());
        singleNames.push(single.title);
        singleIds.push(single.id);
    }

    for (const album of everythingElse)
    {
        if (album.releaseDate > new Date().toISOString())
            // eslint-disable-next-line no-continue
            continue; // Allow duplicate singles to be monitored if the album they are on is not released yet.

        let trackList = await fetch(`${ lidarrUrl }/api/v1/track?artistId=${ artistId }&albumId=${ album.id }&apikey=${ apiKey }`);
        trackList = await trackList.json();

        if (trackList.some((track) => singleNamesLower.includes(track.title.toLowerCase())))
        {
            const trackName = trackList.find((track) => singleNamesLower.includes(track.title.toLowerCase())).title;
            const singleId = singleIds[singleNamesLower.indexOf(trackName.toLowerCase())];
            const artistName = artists.find((artist) => artist.id === artistId).artistName;
            if (printUnmonitored === `true`)
            {
                const single = singles.find((album) => album.id === singleId);
                if (single.statistics.trackFileCount > 0)
                {
                    if (doDelete === `true`)
                    {
                        await fetch(`${ lidarrUrl }/api/v1/album/${ singleId }?apikey=${ apiKey }`, {
                            method: `DELETE`,
                            headers: {
                                "Content-Type": `application/json`
                            },
                        });
                        console.log(`"${ singleNames[singleIds.indexOf(singleId)] }" by ${ artistName } deleted.`);
                    }
                    else
                        console.log(`"${ singleNames[singleIds.indexOf(singleId)] }" by ${ artistName } is downloaded but unmonitored, consider deleting it. ${ lidarrUrl }/album/${ single.foreignAlbumId }`);
                }
            }
            else if (printUnmonitored === `false` && unmonitor === `true`)
            {
                await fetch(`${ lidarrUrl }/api/v1/album/monitor?apikey=${ apiKey }`, {
                    method: `PUT`,
                    headers: {
                        "Content-Type": `application/json`
                    },
                    body: JSON.stringify({
                        albumIds: [singleId],
                        monitored: false
                    }),
                });
                if (doDelete === `true`)
                {
                    await fetch(`${ lidarrUrl }/api/v1/album/${ singleId }?apikey=${ apiKey }`, {
                        method: `DELETE`,
                        headers: {
                            "Content-Type": `application/json`
                        },
                    });
                    console.log(`"${ singleNames[singleIds.indexOf(singleId)] }" by ${ artistName } unmonitored & deleted.`);
                }
                else
                    console.log(`Unmonitored "${ singleNames[singleIds.indexOf(singleId)] }" by ${ artistName }`);
            }
            else if (printUnmonitored === `false` && unmonitor === `false`)
                console.log(`"${ singleNames[singleIds.indexOf(singleId)] }" is also found on ${ album.title } by ${ artistName }`);
        }
    }
}
