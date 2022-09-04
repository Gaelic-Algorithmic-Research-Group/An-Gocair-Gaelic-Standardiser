from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fairseq.models.transformer import TransformerModel

# load the model
pre2goc = TransformerModel.from_pretrained(
  '../models/',
  checkpoint_file='checkpoint_best.pt', # model loc
  data_name_or_path='../bin/', # binary data path
)

# init fastapi
app = FastAPI()

# this is our model
@app.get("/g/{sentence}")
async def generate(sentence: str):

  # generate top 5 suggestions
  results = {}
  example = " ".join(list(sentence.replace(" ","_")))
  # binarize the input
  pre_bin = pre2goc.binarize(example)
  # generate output binaray
  goc_bin = pre2goc.generate(pre_bin, beam=20, sampling=False)

  for i in range(0,10):
    results[i] = pre2goc.decode(goc_bin[i]['tokens']).replace(" ","").replace("_"," ")
  return results
