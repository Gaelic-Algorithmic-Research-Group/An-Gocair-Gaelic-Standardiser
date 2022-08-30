from fairseq.models.transformer import TransformerModel

# load the model
pre2goc = TransformerModel.from_pretrained(
    './models/',
    checkpoint_file='checkpoint_best.pt', # model loc
    data_name_or_path='../bin/', # binary data path
)
