from cli.convert import cli
from cli.convert import split_line_by_sentence
import subprocess
from pytest import raises
import os.path
import filecmp

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
    cli(["--path", file_path])
    file_path = os.path.join(dirname, "testFiles/pred.gaelic_file.txt")
    with open(file_path, "r") as f:
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
        cli(["--path", file_name])


def test_convert_fails_on_whitespace_file():
    """
    This test checks that convert.py fails
    when a file containing only white spaces
    is passed.
    """
    file_name = os.path.join(dirname, "testFiles/whitespace_file.txt")
    with raises(ValueError):
        cli(["--path", file_name])


def test_convert_returns_expected_file():
    """
    This test checks that convert.py outputs the
    expected file when a specific file is input.
    """
    file_path = os.path.join(dirname, "testFiles/gaelic_file.txt")
    cli(["--path", file_path])
    file_path_out = os.path.join(dirname, "testFiles/pred.gaelic_file.txt")
    file_path_expected = os.path.join(
        dirname, "testFiles/pred.gaelic_file.expected.txt"
    )
    # this just checks if the two files are the same
    assert filecmp.cmp(file_path_out, file_path_expected)


def test_convert_directory():
    """
    This test checks that convert.py succeeds
    when a valid directory is passed.
    """
    dir_path = os.path.join(dirname, "testFiles/testDir")
    files = os.listdir(os.path.join(dirname, "testFiles/testDir"))

    # Delete files with pred. prefix
    for file in files:
        if file.startswith("pred."):
            os.remove(os.path.join(dir_path, file))

    # Count the number of files
    n_input_files = len(os.listdir(os.path.join(dirname, "testFiles/testDir")))
    cli(["--path", dir_path])

    # Check that the right number of output files are created
    output_files = os.listdir(os.path.join(dirname, "testFiles/testDir/"))

    # Only include files with the prefix .pred
    n_output_files = len([f for f in output_files if f.startswith("pred.")])

    assert n_input_files == n_output_files


def test_convert_fails_on_empty_directory():
    """
    This test checks that convert.py fails
    when an empty directory is passed.
    """
    dir_path = os.path.join(dirname, "testFiles/emptyDir")
    with raises(ValueError):
        cli(["--path", dir_path])


def test_split_line_by_sentence():
    """
    Test the "split_line_by_sentence" function in the
    cli.convert module
    """
    test_line = "This is a test. Really? Yes! Well, let's hope it works."
    expected_split = [
        "This is a test.",
        "Really?",
        "Yes!",
        "Well, let's hope it works.",
    ]  # this is the split that we would expect
    actual_split = split_line_by_sentence(test_line)
    assert expected_split == actual_split
