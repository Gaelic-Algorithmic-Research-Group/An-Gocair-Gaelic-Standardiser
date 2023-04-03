# Spelling Corrector

This repo contains two main tools:
 - The **command line interface**, located in the `cli/` directory. See `cli/README.MD` for more details.
 - The **web app**:
   - For the back-end we have used `fastapi` and `uvicorn` to set up an API server using Python. This is located in the `server/` directory.
   - For the front-end we have used Next.js with a TypeScript template. This is located in the `web` directory (or `web_new` in the `develop` branch). See `web/README.md` or `web_new/README.md` (in `develop` branch) for more details.

## Command Line Interface
The command line tool allows you to use the Spelling Corrector on the terminal.
See `cli/README.MD` for details.

## Web App
There are currently two active branches in this repository: `main` and `develop`.

### Using your own local pre-trained model
The `main` branch currently uses two API endpoints hosted on [angocair.garg.ed.ac.uk](https://angocair.garg.ed.ac.uk/) to run the two pre-trained transformer models.
You currently cannot run your own pre-trained transformer model on the web app in the `main` branch.

The `develop` branch has three models available through the `web_new/` directory: the ones hosted in [angocair.garg.ed.ac.uk](https://angocair.garg.ed.ac.uk/) plus the local pre-trained model.
To make the local model accessible, you first need to deploy the API server locally using `uvicorn`.
All relevant back-end infrastructure is located in the `server/` directory:
- The local pre-trained model should be placed in `server/models/`.
- The script `server/api/api.py` loads the model and hosts the API.

First, make sure you have installed the necessary Python packages in your environment:

```bash
pip install -r requirements.txt
```

Now you can run the server in the background using:

```bash
nohup uvicorn server.main:app --reload --host 0.0.0.0 &
```

The above command deploys the local model and makes it accessible to the web app through the address http://localhost:8000.
You can open http://localhost:8000/docs in your browser to view the API user interface.

Note that you will need to do the following in order to kill the process running in port 8000, once you are done with it.
In your terminal, run:
```bash
lsof -i:8000
```
Copy the PID of the process and then run:
```bash
kill -9 PID
```

### Run the Web App locally
You can access the operational web app on http://angocair.garg.ed.ac.uk/.
However, if you want to run the web app locally (e.g. for further development), you can do so using the `yarn` package manager.
**Prerequisites**: install Node.js and Yarn - see https://classic.yarnpkg.com/lang/en/docs/install/.

First navigate to the `web/` or `web_new/` (in the `develop` branch) directories and install all dependencies listed within `package.json`:
```bash
cd web
yarn install
```
To run the development server:
```bash
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

To create a production-ready build of the application and export it as a set of static HTML files:
```bash
yarn build && yarn export
```
The output files will be written to `out/`.

Check `web_new/README.MD` (in the `develop` branch) for more details.


### Setup Environment using caddy
**TODO: this section needs reviewing.**

To allow people to access publically, we need to setup caddy or other web hosting server.

```bash
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

# TODO
- [x] API
- [x] UI
- [x] Feature1: suggestion
- [x] Feature2: sentence
- [ ] Make UI prettier
- [ ] Diffchecker
