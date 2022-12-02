#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

sudo rm -rf node_modules
sudo yarn install
sudo pm2 reload codetree-prod
