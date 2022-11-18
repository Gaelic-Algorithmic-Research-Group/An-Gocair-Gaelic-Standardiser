from cli.convert import cli
import subprocess
from pytest import raises
import os.path

def test_convert_works_on_valid_string():
    """
    This test checks that convert.py returns
    a string when a valid string is passed
    """
    dirname = os.path.dirname(__file__)
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
    with raises(Exception):
        cli(["--text", " "])

def test_convert_fails_on_empty_file():
    """
    This test checks that convert.py fails
    when an empty file is passed.
    """
    with raises(Exception):
        cli(["--file", "testFiles/empty_file.txt"])

def test_convert_fails_on_whitespace_file():
    """
    This test checks that convert.py fails
    when a file containing only white spaces
    is passed.
    """
    with raises(Exception):
        cli(["--file", "testFiles/whitespace_file.txt"])


