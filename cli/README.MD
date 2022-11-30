## Command Line Interface
The command line tool is designed to help you convert either a sentence or a file to GOC format.

First make sure you have set up your environment and have installed the necessary Python packages.
Navigate to the root of the repo and run:
```
pip install -r requirements.txt
```
### Sentence
To convert a sentence, run:
```
cd cli
python convert.py --text "example sentence"
```
The output will be printed to screen.

### File
To convert a file, run:
```
cd cli
python convert.py --file gaelic_file.txt
```

A new file named pred.gaelic_file.txt will be created in the working directory.
