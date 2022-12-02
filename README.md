# CodeTree

## Setup

```sh
# login yo your firebase account
firebase login

# setup dependencies of frontend project
# make sure you use yarn
cd frontend
yarn install

# setup dependencies of backend project
cd ..
cd backend
yarn install

# add environemnts and secrets files
cd environments
vim .env.development
vim .evn.production

cd ..
cd secrets
vim fullchain.pem
vim privkey.pem
vim codetree-prod.json
vim codetree-staging.json
```

## Run projects

Frontend

```sh
cd frontend
# for staging server, run
yarn start:staging
# for production server, run
yarn start
```

Backend

```sh
cd backend
# for staging server, run
yarn start:staging
# for production server, run
yarn start
```
