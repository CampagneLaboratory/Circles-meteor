#!/bin/bash

sudo apt-get -y install npm
sudo npm install -g --unsafe-perm pm2
cd $HOME
mkdir circles-webapp
cp webapp.tar.gz circles-webapp/
cd circles-webapp/
tar zxf webapp.tar.gz
sudo apt-get install -y g++ make
cd bundle
(cd programs/server && sudo npm install)

