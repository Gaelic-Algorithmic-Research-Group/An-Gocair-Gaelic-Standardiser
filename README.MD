# Spelling Corrector

This repo contains front end and back end of this app:
- Back-end, we used `fastapi` and `uvicorn` to setup an API server using python
- Front-end, we used nodejs, and typescript

## Structure
```
- web
- server
  - models/
  - api/api.py (load model and host api)
```

To set the server up locally, we have the following steps:
1) [Run the server](#run-locally-server)
2) [Setup the web app](#run-locally-web)
3) The web application could be accessed under `web/out` folder

## Run Locally server

To run locally server in debug mode run:

``` bash
pip3 install -r requirements.txt  --no-cache-dir
nohup uvicorn server.main:app --reload --host 0.0.0.0 &
```
Open your browser to http://localhost:8000/docs to view the API UI.

## Run locally web

 * Prerequisite: install [Node.JS > 14](https://nodejs.org/en/download/package-manager/), install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
``` bash
cd web
yarn install

## dev - open your browser to http://localhost:3000 to view the UI.
### change .env.development to your ip address
yarn dev

## export
yarn build && yarn export
```

# Setup Environment

To allow people to access publically, we need to setup caddy or other web hosting server.

## Setup caddy
```
# download and install caddy
curl -O caddy https://caddyserver.com/api/download?os=linux&arch=arm64&p=github.com%2Fcaddy-dns%2Fcloudflare&idempotency=91119776165967
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
systemctl status caddy

# change Caddyfile
nvim /etc/caddy/Caddyfile
systemctl reload caddy
systemctl status caddy

# copy the html
cp -r ./web/out/. /usr/share/caddy/
```

# Black
A Git configuration has been added that can be used to automatically run `black` (the Python code formatter) every time a commit is made:

1. Make sure that you have `pre-commit` installed (it should have been installed after running `pip install -r requirements.txt`).
2. Install the configuartion by running `pre-commit install` in the root directory of the repo. This will read the `.pre-commit-config.yaml` file.
3. Now, every time you do a Git commit, `black` will run automatically and format any Python files.

A GitHub Action has also been created that will check that Python files have been formatted with `black` after every push or pull request.

# Testing
Tests for the command line interface `cli/convert.py` have been included in the `tests/` directory.
To run the tests locally, run `pytest` from root directory of the repo.
A GitHub Action has also been created that will run the tests automatically after every push or pull request.

# TODO
- [x] API
- [x] UI
- [x] Feature1: suggestion
- [x] Feature2: sentence
- [ ] Make UI prettier
- [ ] Diffchecker
