#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

sudo rm -rf node_modules
sudo npm install
sudo pm2 reload codetree-prod
