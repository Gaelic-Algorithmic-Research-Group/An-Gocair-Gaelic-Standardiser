# convert a sentence or a file to GOC format using the command line:
# python convert.py --text "example sentence"
# python convert.py --file "gaelic_file.txt"

from fairseq.models.transformer import TransformerModel
import argparse
import os
import sys
import re


def cli(args=None):
    # If no arguments are specified, take the list of
    # command line arguments passed to the Python script
    if not args:
        args = sys.argv[1:]
    argparser = argparse.ArgumentParser()
    argparser.add_argument("--text", type=str, help="Text to translate")
    argparser.add_argument(
        "--path", type=str, help="Path of file or folder to translate"
    )
    argparser.add_argument(
        "--model",
        type=str,
        default="checkpoint_best.pt",
        help="Model file to use for the spelling correction. The default is checkpoint_best.pt",
    )

    # The parse_args() function will use an argument list if specified,
    # otherwise it will use the passed command line arguments
    args = argparser.parse_args(args)
    convert(args.text, args.path, args.model)


def load_model(model):
    """
    Load the pretrained tranformer model, specified
    by the flag --model. The model file must be
    contained in the models/ subfolder.
    """
    # TODO this outputs a bunch of model info to the screen - can we avoid it?
    # TODO include flag in argparse for model
    dirname = os.path.dirname(__file__)
    models_path = os.path.join(dirname, "models/")
    binary_path = os.path.join(dirname, "binary/")
    # Load the model
    pre2goc = TransformerModel.from_pretrained(
        models_path,
        checkpoint_file=model,  # model loc
        data_name_or_path=binary_path,  # binary data path
    )
    return pre2goc


def translate(inputs, pre2goc):
    """Translate input sentence using model"""
    inputs = " ".join(list(inputs.replace(" ", "_")))
    return pre2goc.translate(inputs).replace(" ", "").replace("_", " ")


def split_file_by_line(file):
    """
    Given an input file path, split it into lines.
    Return a list where each element in the list is
    a different line of the file.
    """
    if os.path.isfile(file):
        with open(file, "r") as f:
            lines_in_file = f.readlines()  # returns every line in the file in a list
    else:
        raise Exception("File does not exist")

    # check file is not empty, ignoring leading blank lines and spaces
    text_test = " ".join(lines_in_file)
    text_test = text_test.strip()
    if not text_test:
        raise ValueError("File is empty")

    lines_in_file = [
        line.strip() for line in lines_in_file
    ]  # note that strip removes newline characters

    return lines_in_file


def split_line_by_sentence(line):
    """
    Given an input line of text, split it into sentences, where
    the end of a sentence is identified by ".", "?" or "!".
    The line split is returned as a list, where each element
    of the list is a different sentence.
    """
    delimiters = ".", "?", "!"
    # re.escape allows to build the pattern automatically
    # and have the delimiters escaped nicely.
    regex_pattern = "|".join(map(re.escape, delimiters))
    # If capturing parentheses are used in pattern, then the text of all
    # groups in the pattern are also returned as part of the resulting list.
    regex_pattern = "(" + regex_pattern + ")"
    # the following returns a list where the line is split into sentences
    # followed by the corresponding punctuation mark
    split_line = re.split(regex_pattern, line)
    # now join the sentences with their corresponding punctuation marks
    delimiters = list(delimiters)
    sentences_in_line = []  # initialize the list that will contain our final sentences
    iterator = iter(
        split_line[1:]
    )  # create an iterator to access the next item of the list in the loop below
    for sentence in split_line:
        punctuation_mark = next(iterator, "")  # next item of the list
        is_sentence = bool(sentence)
        if is_sentence and sentence not in delimiters:
            sentence = sentence.strip() + punctuation_mark
            sentences_in_line.append(sentence)
    return sentences_in_line


def translate_line_sentence_by_sentence(line, pre2goc):
    """
    Given an input line of text, feed each sentence in the line
    into the model and translate it. The translated sentences are
    concatenaed back into a line and returned.
    """
    # sentences_in_line is a list where each element is a different sentence
    sentences_in_line = split_line_by_sentence(line)
    translated_line = ""
    # loop through the sentences that the line is composed of,
    # and translate one by one
    for sentence in sentences_in_line:
        translated_sentence = translate(sentence, pre2goc)
        translated_line += (
            translated_sentence + " "
        )  # need to add a white space after each sentence
    return translated_line.strip()


def write_translated_text_to_file(translated_text, input_file):
    """
    Write the translated file to disk. The translated file
    is named as the input file preceeded by "pred."
    """
    with open(
        os.path.join(
            os.path.dirname(input_file),
            "pred." + os.path.basename(input_file),
        ),
        "w",
    ) as f:
        f.write(translated_text)


def get_txt_files(list_of_files):
    txt_files = [file for file in list_of_files if ".txt" in file]
    if any(txt_files):
        return txt_files
    else:
        raise ValueError("The specified path does not contain .txt files")


def convert(text, path, model):
    """
    This is the main function that converts
    a sentence (text), a single text file, or a folder
    containing text files, to GOC format.
    """

    pre2goc = load_model(model)

    if text:
        # Check string is not empty
        text = text.strip()
        if not text:
            raise ValueError("Please enter text to translate")
        translated_text = translate_line_sentence_by_sentence(text, pre2goc)
        print(translated_text)

    if path:
        if os.path.isfile(path):
            list_of_files = [path]
            txt_files = get_txt_files(
                list_of_files
            )  # if the path corresponds to a valid .txt file, returns a list with a single file name
        elif os.path.isdir(path):
            list_of_files = os.listdir(
                path
            )  # returns a list of files contained in the folder
            txt_files = get_txt_files(
                list_of_files
            )  # get the .txt files from this list
            txt_files = [
                os.path.join(path, file) for file in txt_files
            ]  # append the folder path to the file name
        else:
            raise Exception("The specified path is not valid")

        # loop through every .txt file
        for file in txt_files:
            lines_in_file = split_file_by_line(
                file
            )  # returns a list where each element is a line of the file
            translated_text = ""  # initialize the translated text string
            # loop through every line in the file, and translate the line
            # sentence by sentence. Concatenate the translated line into
            # the translated text string.
            for line in lines_in_file:
                line_has_text = bool(
                    line
                )  # empty strings in the list are False and they denote new paragraphs
                if line_has_text:
                    translated_text += translate_line_sentence_by_sentence(
                        line, pre2goc
                    )
                    translated_text += (
                        "\n"  # at the end of the line, insert a new line character
                    )
                else:
                    translated_text += "\n"  # start new paragraph
            write_translated_text_to_file(translated_text, input_file=file)

    if not text and not path:
        raise Exception(
            "Please specify either the text or the path of a file or folder to translate"
        )


if __name__ == "__main__":
    cli()
