# load the pretrained model using command line
# python convert.py --model bert-base-uncased --text (optional) "Hello, my dog is cute" --file (optional) "data.txt"

from fairseq.models.transformer import TransformerModel
import argparse

argparser = argparse.ArgumentParser()
argparser.add_argument('--model', type=str, help='model path')
argparser.add_argument('--text', type=str, help='text to translate')
argparser.add_argument('--file', type=str, help='file to translate')
args = argparser.parse_args()

# load the model

pre2goc = TransformerModel.from_pretrained(
    'models/',
    checkpoint_file='checkpoint_best.pt', # model loc
    data_name_or_path='binary/', # binary data path
)

if args.text:
    print(pre2goc.translate(args.text))

if args.file:
    with open(args.file, 'r') as f:
        text = f.readlines()
    
    # process the text sentence by sentence and keep the \n
    with open(args.file + '.pred', 'w') as f:
        for line in text:
            for sentence in line.split('.'):
                f.write(pre2goc.translate(sentence) + '.')
            f.write('\n')