#!/bin/bash
set -e

if [[ $1 != "staging" ]] && [[ $1 != "prod" ]]; then
    echo 'usage: deploy [staging | prod]' $1
    exit 0
fi

rm -r ./build
yarn build:$1

if [ $1 == "staging" ]; then
    yarn firebase use staging
    yarn firebase deploy --only hosting
elif [ $1 == "prod" ]; then
    yarn firebase use default
    yarn firebase deploy --only hosting
fi
