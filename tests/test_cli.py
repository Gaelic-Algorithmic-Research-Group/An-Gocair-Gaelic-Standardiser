from cli.convert import cli
import subprocess
from pytest import raises
import os.path

dirname = os.path.dirname(__file__)

def test_convert_works_on_valid_string():
    """
    This test checks that convert.py returns
    a string when a valid string is passed.
    """
    path_name = os.path.join(dirname, "../cli/convert.py")
    input_string = "This is a test"
    output_string = subprocess.check_output(
        ["python", path_name, "--text", input_string],
        )
    assert bool(output_string.strip())

def test_convert_fails_on_empty_string():
    """
    This test checks that convert.py fails
    when empty string is passed.
    """
    with raises(ValueError):
        cli(["--text", " "])

def test_convert_works_on_valid_file():
    """
    This test checks that convert.py returns
    a non-empty file when a valid file is passed.
    """
    file_path = os.path.join(dirname, "testFiles/gaelic_file.txt")
    cli(["--file", file_path])
    file_path = os.path.join(dirname, "testFiles/pred.gaelic_file.txt")
    with open(file_path, 'r') as f:
        file_text = f.readlines()
    text_test = " ".join(file_text)
    text_test = text_test.strip()
    assert bool(text_test)

def test_convert_fails_on_empty_file():
    """
    This test checks that convert.py fails
    when an empty file is passed.
    """
    file_name = os.path.join(dirname, "testFiles/empty_file.txt")
    with raises(ValueError):
        cli(["--file", file_name])

def test_convert_fails_on_whitespace_file():
    """
    This test checks that convert.py fails
    when a file containing only white spaces
    is passed.
    """
    file_name = os.path.join(dirname, "testFiles/whitespace_file.txt")
    with raises(ValueError):
        cli(["--file", file_name])


