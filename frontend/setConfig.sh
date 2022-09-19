#!/bin/bash
set -e

if [[ $1 != "staging" ]] && [[ $1 != "prod" ]] && [[ $1 != "local" ]]; then
    echo 'usage: setConfig [local | staging | prod]' $1
    exit 0
fi

if [ $1 == "local" ]; then
    cat ./src/environments/Configuration.local.ts > ./src/environments/Configuration.ts
elif [ $1 == "staging" ]; then
    cat ./src/environments/Configuration.staging.ts > ./src/environments/Configuration.ts
elif [ $1 == "prod" ]; then
    cat ./src/environments/Configuration.prod.ts > ./src/environments/Configuration.ts
fi
