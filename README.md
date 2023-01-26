<div align="center">
<h1><a href="https://hub.docker.com/r/chxseh/lidarr-true-singles">lidarr-true-singles</a><br>
<a href="https://chse.dev/donate"><img alt="Donate" src="https://badges.chse.dev:/badge/Donate_To_This_Project-brightgreen"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/actions/workflows/linter.yml"><img alt="GitHub Actions Status" src="https://github.com/chxseh/lidarr-true-singles/actions/workflows/linter.yml/badge.svg"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/stargazers"><img alt="Stars" src="https://badges.chse.dev:/github/stars/chxseh/lidarr-true-singles"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/issues"><img alt="Issues" src="https://badges.chse.dev:/github/issues/chxseh/lidarr-true-singles"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/pulls"><img alt="Pull Requests" src="https://badges.chse.dev:/github/issues-pr/chxseh/lidarr-true-singles"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/network"><img alt="Forks" src="https://badges.chse.dev:/github/forks/chxseh/lidarr-true-singles"></a>
<a href="https://github.com/chxseh/lidarr-true-singles/blob/main/LICENSE.md"><img alt="License" src="https://badges.chse.dev:/github/license/chxseh/lidarr-true-singles"></a>
</h1></div>

Automatically unmonitor promotional singles from Lidarr.

## Running
```bash
docker run --rm \
    --name lidarr-true-singles \
    -e LIDARR_URL=http://localhost:8686 \
    -e LIDARR_API_KEY=your_api_key \
    -e UNMONITOR=false \
    -e OUTPUT_UNMONITORED=false \
    ghcr.io/chxseh/lidarr-true-singles:latest
```

| Environment Variable | Description                                                                                     | Default                 |
| -------------------- | ----------------------------------------------------------------------------------------------- | ----------------------- |
| `LIDARR_URL`         | The URL to your Lidarr instance                                                                 | `http://localhost:8686` |
| `LIDARR_API_KEY`     | Your Lidarr API Key                                                                             |                         |
| `UNMONITOR`          | Whether to unmonitor the tracks or not                                                          | `false`                 |
| `OUTPUT_UNMONITORED` | Print unmonitored singles that are downloaded. Note that this overrides the `UNMONITOR` option. | `false`                 |

| Variable             | Option  | Effect                                                                                                  |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `MONITOR`            | `false` | Will *just* tell you what singles it finds on albums                                                    |
| `MONITOR`            | `true`  | Will *just* unmonitor said singles and let you know that it unmonitored them                            |
| `OUTPUT_UNMONITORED` | `false` | Will do nothing (falls back to what you have `MONITOR` set to, if any)                                  |
| `OUTPUT_UNMONITORED` | `true`  | Will *just* tell you about **any** single that is unmonitored and downloaded, with a link to delete it. |

## Development
```bash
git clone https://github.com/chxseh/lidarr-true-singles.git
cd lidarr-true-singles
npm i
cp .env.example .env
# Edit .env with your Lidarr URL and API Key
node .
```
