# load the pretrained model using command line
# python convert.py --model bert-base-uncased --text (optional) "Hello, my dog is cute" --file (optional) "data.txt"

from fairseq.models.transformer import TransformerModel
import argparse
import logging

argparser = argparse.ArgumentParser()
argparser.add_argument('--model', type=str, help='model path')
argparser.add_argument('--text', type=str, help='text to translate')
argparser.add_argument('--file', type=str, help='file to translate')
args = argparser.parse_args()

# Load the model
pre2goc = TransformerModel.from_pretrained(
    'models/',
    checkpoint_file='checkpoint_best.pt', # model loc
    data_name_or_path='binary/', # binary data path
)

def translate(inputs):
    inputs = " ".join(list(inputs.replace(" ","_")))
    return pre2goc.translate(inputs).replace(" ","").replace("_"," ")

if args.text:

# Check string is not empty
    if not args.text.strip():
        logging.error("!!! Please enter text to translate !!!")

    translated_result = translate(args.text)
    print(translated_result)

if args.file:
    with open(args.file, 'r') as f:
        text = f.readlines()

    # check file is not empty, ignoring leading blank lines and spaces
    text_test = " ".join(text)
    text_test = text_test.strip()
    if not text_test:
        logging.error('!!! File is empty !!!')

    # process the text sentence by sentence and keep the \n
    translated_text = ""
    with open('pred.'+args.file, 'w') as f:
        for line in text:
            for sentence in line.split('.'):
                if sentence =="\n":
                    translated_text += "\n"
                else:
                    sentence = sentence.strip()+'.'
                    translated_sentence = translate(sentence) # Run the model
                    translated_text += translated_sentence + " "
            f.write(translated_text)



if not args.text and not args.file:
    logging.error("Please specify either --text or --file")

if __name__ == "main":
    translate(args.text)
