from ctypes import sizeof
from fastapi import APIRouter, Body
import srsly
import hashlib
from server.models import ParaphraseResponse, SplitSentenceResponse, SplitSentenceRequest
from server.transformer import pre2goc

example_request = srsly.read_json("server/data/example_split.json")


api_router = APIRouter()


@api_router.post("/sentence-spiltter", response_model=SplitSentenceResponse, tags=["NER"])
async def sentence_spiltter(body: SplitSentenceRequest = Body(..., example=example_request)):
    """Split text by sentence."""
    text = body.text
    id = hashlib.sha256(text).hexdigest()
    sentences = []

    return {"data": {
        "id": id,
        "sentences": sentences,
    }}


@api_router.get("/paraphrase", response_model=ParaphraseResponse, tags=["NER"])
async def paraphrase(text: str):
    """Paraphrase sentence."""

    # binarize the input
    pre_bin = pre2goc.binarize(text)
    # generate output binaray
    goc_bin = pre2goc.generate(pre_bin, beam=10, sampling=False)
    # generate top 5 suggestions
    sentences = [pre2goc.decode(v['tokens']).replace(" ","").replace("_"," ") for v in goc_bin[0:5]]
    return {"data": sentences}

