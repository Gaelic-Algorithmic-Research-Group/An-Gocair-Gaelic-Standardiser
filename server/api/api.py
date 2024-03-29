from ctypes import sizeof
from fastapi import APIRouter, Body
import srsly
import hashlib
from server.models import ParaphraseResponse, SplitSentenceResponse, SplitSentenceRequest
from server.transformer import pre2goc

example_request = srsly.read_json("server/data/example_split.json")


api_router = APIRouter()


@api_router.post("/sentence-spiltter", response_model=SplitSentenceResponse)
async def sentence_spiltter(body: SplitSentenceRequest = Body(..., example=example_request)):
    """Split text by sentence."""
    # note that in the current implementation, this sentence splitter is not used
    # the splitting is performed in the frontend
    # TODO: implement sentence splitter in the backend
    text = body.text
    id = hashlib.sha256(text).hexdigest()
    sentences = []

    return {"data": {
        "id": id,
        "sentences": sentences,
    }}


@api_router.get("/paraphrase", response_model=ParaphraseResponse)
async def paraphrase(text: str):
    """Paraphrase sentence."""

    toktext = " ".join(list(text.replace(" ","_")))
    # binarize the input
    pre_bin = pre2goc.binarize(toktext)
    # generate output binaray
    goc_bin = pre2goc.generate(pre_bin, beam=20, sampling=False)
    # generate top 5 suggestions
    sentences = [pre2goc.decode(v['tokens']).replace(" ","").replace("_"," ") for v in goc_bin[0:3]]
    return {"data":sentences, "text": [text]}

