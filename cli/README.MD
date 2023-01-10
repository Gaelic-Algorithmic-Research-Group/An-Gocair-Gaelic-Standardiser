## Command Line Interface
The command line tool is designed to help you convert either a line of text, a single text file, or a folder containing text files, to GOC format.

First make sure you have set up your environment and have installed the necessary Python packages.
Navigate to the root of the repo and run:
```
pip install -r requirements.txt
```
### Line of text
To convert a line of text, from the root of the repo, run:
```
cd cli
python convert.py --text "example sentence"
```
The output will be printed to screen.

### Single text file
To convert a single text file (named, for example, `gaelic_file.txt`), from the root of the repo, run:
```
cd cli
python convert.py --path gaelic_file.txt
```

The output will be saved to a text file named `pred.gaelic_file.txt`.

### Folder containing text files
To convert multiple text files contained in a folder (named, for example, `testDir`), from the root of the repo, run:

```
cd cli
python convert.py --path testDir
```

If `testDir` contains two text files named, for example, `01_gaelic_file.txt` and `02_gaelic_file.txt`, the output will be saved to text files `pred.01_gaelic_file.txt` and `pred.02_gaelic_file.txt` in `testDir`.


### Specify the transformer model path
The default transformer model is set to `cli/models/checkpoint_best.pt`.
To specify an alternative model use the `--model` flag.
From the root of the repo, run:

```
cd cli
python convert.py --text "example sentence" --model model_file_name.pt
```

where `model_file_name.pt` must be contained in `cli/models`.
