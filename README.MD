# TransformerAPI

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

## dev
yarn dev

## export 
yarn build && yarn export
```

Open your browser to http://localhost:3000 to view the UI.

## TODO
- [x] API
- [x] UI
- [x] Feature1: suggestion
- [x] Feature2: sentence
- [ ] Make UI prettier
- [ ] Diffchecker


## Directory

- web
- server
  - models/
  - api
