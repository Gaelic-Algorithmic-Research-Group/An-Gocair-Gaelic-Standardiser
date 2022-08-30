FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
ENV PORT 8080
ENV APP_MODULE app.api:app
ENV LOG_LEVEL debug
ENV WEB_CONCURRENCY 2

COPY ./requirements/base.txt ./requirements/base.txt
RUN pip install -r requirements/base.txt

COPY .env /app/.env
COPY ./app /app/app
