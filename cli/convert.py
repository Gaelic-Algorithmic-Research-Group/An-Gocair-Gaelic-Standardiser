# load the pretrained model using command line
# python convert.py --model bert-base-uncased --text (optional) "Hello, my dog is cute" --file (optional) "data.txt"

from fairseq.models.transformer import TransformerModel
import argparse
import os.path
import sys

def cli(args=None):
    # If no arguments are specified, take the list of  
    # command line arguments passed to the Python script
    if not args:
        args = sys.argv[1:]
    argparser = argparse.ArgumentParser()
    argparser.add_argument('--text', type=str, help='text to translate')
    argparser.add_argument('--file', type=str, help='file to translate')
    # The parse_args() function will use an argument list if specified,
    # otherwise it will use the passed command line arguments
    args = argparser.parse_args(args)
    convert(args.text, args.file)

def convert(text, file):
    # Load the model
    # TODO this outputs a bunch of model info to the screen - can we avoid it?
    # TODO include flag in argparse for model
    pre2goc = TransformerModel.from_pretrained(
        'models/',
        checkpoint_file='checkpoint_best.pt', # model loc
        data_name_or_path='binary/', # binary data path
    )

    def translate(inputs):
        inputs = " ".join(list(inputs.replace(" ","_")))
        return pre2goc.translate(inputs).replace(" ","").replace("_"," ")

    if text:
        # Check string is not empty
        if not text.strip():
            raise Exception("Please enter text to translate")
        translated_text = translate(text)
        print(translated_text)

    if file:
        if os.path.isfile(file):
            with open(file, 'r') as f:
                file_text = f.readlines() # returns every line in the file in a list
        else:
            raise Exception("File does not exist")

        # check file is not empty, ignoring leading blank lines and spaces
        text_test = " ".join(file_text)
        text_test = text_test.strip()
        if not text_test:
            raise Exception('File is empty')

        # process the text sentence by sentence, respecting newline characters
        translated_text = "" # initialize the translated text string
        file_text = [line.strip() for line in file_text] # note that strip removes newline characters
        is_text = [bool(line) for line in file_text] # empty strings in the list are False and they denote new paragraphs
        for ii in range(len(file_text)):
            # loop through every line in the text, split the lines into sentences and translate sentence by sentence.
            # the end of a sentence is identified by a '.'
            if is_text[ii]:
                line = file_text[ii]
                for sentence in line.split('.'):
                    if sentence:
                        sentence = sentence.strip() + '.'
                        translated_sentence = translate(sentence) # Run the model
                        translated_text += translated_sentence + " "
                translated_text += "\n" # at the end of the line, insert a new line character
            else:
                translated_text += "\n" # start new paragraph
        # write the translated text to disk
        # TODO This is a bit of a mess
        with open("pred." + file, 'w') as f:
            f.write(translated_text)

    if not text and not file:
        raise Exception("Please specify either the text or the file to translate")

if __name__ == '__main__':
    cli()