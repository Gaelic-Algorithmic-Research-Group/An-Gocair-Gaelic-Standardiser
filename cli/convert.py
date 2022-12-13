# convert a sentence or a file to GOC format using the command line:
# python convert.py --text "example sentence"
# python convert.py --file "gaelic_file.txt"

from fairseq.models.transformer import TransformerModel
import argparse
import os.path
import sys
import re


def cli(args=None):
    # If no arguments are specified, take the list of
    # command line arguments passed to the Python script
    if not args:
        args = sys.argv[1:]
    argparser = argparse.ArgumentParser()
    argparser.add_argument("--text", type=str, help="text to translate")
    argparser.add_argument("--file", type=str, help="file to translate")
    argparser.add_argument("--dir", type=str, help="directory to translate all files")

    # The parse_args() function will use an argument list if specified,
    # otherwise it will use the passed command line arguments
    args = argparser.parse_args(args)

    # If a directory is passed, find all the files within it and translate each file.
    # Otherwise, translate the text or file passed.
    if args.dir:
        # Check directory exists
        if not os.path.isdir(args.dir):
            raise Exception("Directory does not exist")

        # Check directory isn't empty
        if not os.listdir(args.dir):
            raise ValueError("Directory is empty")

        # Check directory contains at least one .txt file
        if not any(file.endswith(".txt") for file in os.listdir(args.dir)):
            raise ValueError("Directory contains no .txt files")

        for file in os.listdir(args.dir):
            if file.endswith(".txt"):
                convert(None, os.path.join(args.dir, file))
    else:
        convert(args.text, args.file)


def load_model():
    # TODO this outputs a bunch of model info to the screen - can we avoid it?
    # TODO include flag in argparse for model
    dirname = os.path.dirname(__file__)
    models_path = os.path.join(dirname, "models/")
    binary_path = os.path.join(dirname, "binary/")
    # Load the model
    pre2goc = TransformerModel.from_pretrained(
        models_path,
        checkpoint_file="checkpoint_best.pt",  # model loc
        data_name_or_path=binary_path,  # binary data path
    )
    return pre2goc


def translate(inputs, pre2goc):
    """Translate input sentence using model"""
    inputs = " ".join(list(inputs.replace(" ", "_")))
    return pre2goc.translate(inputs).replace(" ", "").replace("_", " ")


def translate_line_sentence_by_sentence(line, pre2goc):
    """
    Given an input line of text, split it into sentences, where
    the end of a sentence is identified by ".", "?" or "!".
    Then feed each sentence into the model and translate it.
    The translated sentences are concatenaed back into a line
    of text and returned.
    """
    delimiters = ".", "?", "!"
    # re.escape allows to build the pattern automatically
    # and have the delimiters escaped nicely.
    regex_pattern = "|".join(map(re.escape, delimiters))
    # If capturing parentheses are used in pattern, then the text of all
    # groups in the pattern are also returned as part of the resulting list.
    regex_pattern = "(" + regex_pattern + ")"
    split_line = re.split(regex_pattern, line)

    delimiters = list(delimiters)
    # create an iterator to access the next item of the list in the loop below
    iterator = iter(split_line[1:])
    translated_line = ""

    for sentence in split_line:
        element = next(iterator, "")  # next item of the list
        if sentence and sentence not in delimiters:
            sentence = sentence.strip() + element
            translated_sentence = translate(sentence, pre2goc)
            translated_line += translated_sentence + " "
    return translated_line.strip()


def convert(text, file):
    """
    This is the main function that converts
    a sentence (text) or a file to GOC format.
    """

    pre2goc = load_model()

    if text:
        # Check string is not empty
        text = text.strip()
        if not text:
            raise ValueError("Please enter text to translate")
        translated_text = translate_line_sentence_by_sentence(text, pre2goc)
        print(translated_text)

    if file:
        if os.path.isfile(file):
            with open(file, "r") as f:
                file_text = f.readlines()  # returns every line in the file in a list
        else:
            raise Exception("File does not exist")

        # check file is not empty, ignoring leading blank lines and spaces
        text_test = " ".join(file_text)
        text_test = text_test.strip()
        if not text_test:
            raise ValueError("File is empty")

        # process the text sentence by sentence, respecting newline characters
        translated_text = ""  # initialize the translated text string
        file_text = [
            line.strip() for line in file_text
        ]  # note that strip removes newline characters
        is_text = [
            bool(line) for line in file_text
        ]  # empty strings in the list are False and they denote new paragraphs
        for ii in range(len(file_text)):
            # loop through every line in the text, split the lines into sentences and translate sentence by sentence.
            if is_text[ii]:
                line = file_text[ii]
                translated_text += translate_line_sentence_by_sentence(line, pre2goc)
                translated_text += (
                    "\n"  # at the end of the line, insert a new line character
                )
            else:
                translated_text += "\n"  # start new paragraph
        # write the translated text to disk
        # TODO This is a bit of a mess
        with open(
            os.path.join(os.path.dirname(file), "pred." + os.path.basename(file)), "w"
        ) as f:
            f.write(translated_text)

    if not text and not file:
        raise Exception("Please specify either the text or the file to translate")


if __name__ == "__main__":
    cli()
