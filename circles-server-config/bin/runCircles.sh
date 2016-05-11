#!/bin/bash

export MONGO_URL='mongodb://<user>:<password>@localhost:27017/circles'
export ROOT_URL='http://localhost'
export PORT=80
cd ~/circles-webapp/bundle/
pm2 start node main.js --name "circles"

