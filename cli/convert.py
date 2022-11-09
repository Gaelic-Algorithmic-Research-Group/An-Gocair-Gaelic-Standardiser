# load the pretrained model using command line
# python convert.py --model bert-base-uncased --text (optional) "Hello, my dog is cute" --file (optional) "data.txt"

from fairseq.models.transformer import TransformerModel
import argparse

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
    translated_result = translate(args.text)
    print(translated_result)

if args.file:
    with open(args.file, 'r') as f:

    # check file is not empty
        first_char = f.read(1)
        if not first_char:
            print("\n\n\n")
            print("File is empty")
            print("\n\n\n")
            exit()
    # read in text from file
        text = f.readlines()



    # process the text sentence by sentence and keep the \n
    with open('pred.'+args.file, 'w') as f:
        for line in text:
            for sentence in line.split('.'):
                if sentence =="\n":
                    f.write("\n")
                else:
                    sentence = sentence.strip()+'.'
                    f.write(translate(sentence)+" ")

if not args.text and not args.file:
    print("Please specify either --text or --file")

if __name__ == "main":
    translate(args.text)
