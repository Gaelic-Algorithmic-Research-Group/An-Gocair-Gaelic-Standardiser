#!/bin/bash

pip3 install --user virtualenv
virtualenv .venv && source .venv/bin/activate && pip install -r ./requirements/base.txt