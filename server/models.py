from typing import List
from pydantic import BaseModel


class SplitSentenceRequest(BaseModel):
    text: str


class Sentence(BaseModel):
    text: str


class SplitSentenceResponse(BaseModel):
    id: str
    sentences: List[str]


class ParaphraseResponse(BaseModel):
    data: List[str]
    text: List[str]
