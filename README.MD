# TransformerAPI

## Run Locally server
To run locally server in debug mode run:

```
bash ./create_virtualenv.sh
uvicorn server.main:app --reload
```
Open your browser to http://localhost:8000/docs to view the OpenAPI UI.

## Run locally web

 * Prerequisite: install Node.JS > 14

```
cd web
yarn install
yarn dev
```

Open your browser to http://localhost:3000 to view the UI.

## TODO
- [x] API
- [x] UI
- [ ] Feature1: suggestion
- [x] Feature2: sentence


## Directory

- web
- server
  - models/
  - api
