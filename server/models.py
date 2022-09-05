from pydantic import BaseModel

class SplitSentenceRequest(BaseModel):
    text: str


class Sentence(BaseModel):
    text: str


class SplitSentenceResponse(BaseModel):
    data: list[Sentence]


class ParaphraseResponse(BaseModel):
    data: list[str]
    text: list[str] 
