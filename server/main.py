import os

from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from server.api.api import api_router

load_dotenv(find_dotenv())
prefix = os.getenv("CLUSTER_ROUTE_PREFIX", "").rstrip("/")


app = FastAPI(
    title="TransformerAPI",
    version="1.0",
    description="...",
    openapi_prefix=prefix,
)


@app.get("/", include_in_schema=False)
def docs_redirect():
    return RedirectResponse(f"{prefix}/docs")


# Set all CORS enabled origins
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.include_router(api_router, prefix)

