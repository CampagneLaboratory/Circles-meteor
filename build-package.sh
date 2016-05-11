#!/bin/bash

npm install --production
mkdir -p packages
cd ./webapp
meteor build ../packages --architecture os.linux.x86_64 --server-only

