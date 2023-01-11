import { config } from "dotenv";
import fetch from 'node-fetch';

config();

let lidarrUrl = process.env.LIDARR_URL;
if (lidarrUrl.endsWith(`/`))
    lidarrUrl = lidarrUrl.slice(0, -1);

const apiKey = process.env.LIDARR_API_KEY;

let artists = await fetch(`${ lidarrUrl }/api/v1/artist?apikey=${ apiKey }`);
artists = await artists.json();

const artistIdsObject = artists.map((artist) => artist.artistMetadataId);

for (const artistId of artistIdsObject)
{
    let albums = await fetch(`${ lidarrUrl }/api/v1/album?artistId=${ artistId }&includeAllArtistAlbums=true&apikey=${ apiKey }`);
    albums = await albums.json();
    let singles = albums.filter((album) => album.albumType === `Single`);
    singles = singles.filter((album) => album.monitored === true);

    let everythingElse = albums.filter((album) => album.albumType !== `Single`);
    everythingElse = everythingElse.filter((album) => album.monitored === true);

    const singleNames = [];
    const singleIds = [];
    for (const single of singles)
    {
        singleNames.push(single.title);
        singleIds.push(single.id);
    }

    for (const album of everythingElse)
    {
        let trackList = await fetch(`${ lidarrUrl }/api/v1/track?artistId=${ artistId }&albumId=${ album.id }&apikey=${ apiKey }`);
        trackList = await trackList.json();

        if (trackList.some((track) => singleNames.includes(track.title)))
        {
            const singleId = singleIds[singleNames.indexOf(trackList.find((track) => singleNames.includes(track.title)).title)];

            const artistName = artists.find((artist) => artist.id === artistId).artistName;
            console.log(`"${ singleNames[singleIds.indexOf(singleId)] }" is also found on ${ album.title } by ${ artistName }`);
        }
    }
}
