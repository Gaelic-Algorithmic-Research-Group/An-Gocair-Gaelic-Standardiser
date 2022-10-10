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
bash ./create_virtualenv.sh
nohup uvicorn server.main:app --reload &
```
Open your browser to http://localhost:8000/docs to view the OpenAPI UI.

## Run locally web

 * Prerequisite: install Node.JS > 14

``` bash
cd web
yarn install

## dev - open your browser to http://localhost:3000 to view the UI.
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



  

## TODO
- [x] API
- [x] UI
- [x] Feature1: suggestion
- [x] Feature2: sentence
- [ ] Make UI prettier
- [ ] Diffchecker



