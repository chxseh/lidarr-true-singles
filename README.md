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
    -e DELETE=false \
    -e OUTPUT_UNMONITORED=false \
    ghcr.io/chxseh/lidarr-true-singles:latest
```

| Environment Variable | Description                                                                                     | Default                 |
| -------------------- | ----------------------------------------------------------------------------------------------- | ----------------------- |
| `LIDARR_URL`         | The URL to your Lidarr instance                                                                 | `http://localhost:8686` |
| `LIDARR_API_KEY`     | Your Lidarr API Key                                                                             |                         |
| `UNMONITOR`          | Whether to unmonitor the tracks or not                                                          | `false`                 |
| `DELETE`             | Whether to delete the tracks or not                                                             | `false`                 |
| `OUTPUT_UNMONITORED` | Print unmonitored singles that are downloaded. Note that this overrides the `UNMONITOR` option. | `false`                 |

| Environment Variable                       | Outcome                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| `UNMONITOR=false`                          | See duplicate singles                                    |
| `UNMONITOR=true`                           | Unmonitor duplicate singles                              |
| `UNMONITOR=true`<br>`DELETE=true`          | Delete duplicate singles                                 |
| `OUTPUT_UNMONITORED=true`                  | See duplicate unmonitored singles that are downloaded    |
| `OUTPUT_UNMONITORED=true`<br>`DELETE=true` | Delete duplicate unmonitored singles that are downloaded |

## Development
```bash
git clone https://github.com/chxseh/lidarr-true-singles.git
cd lidarr-true-singles
npm i
cp .env.example .env
# Edit .env with your Lidarr URL and API Key
node .
```
