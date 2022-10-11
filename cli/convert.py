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

def translate(inputs):
    inputs = " ".join(list(inputs.replace(" ","_")))
    return pre2goc.translate(inputs).replace(" ","").replace("_"," ")

if args.text:
    print(translate(args.text))

if args.file:
    with open(args.file, 'r') as f:
        text = f.readlines()
    
    # process the text sentence by sentence and keep the \n
    with open(args.file + '.pred', 'w') as f:
        for line in text:
            for sentence in line.split('.'):
                f.write(translate(sentence) + '.')
            f.write('\n')

if not args.text and not args.file:
    print("Please specify either --text or --file")

if __main__ == '__name__':
    translate(args.text)