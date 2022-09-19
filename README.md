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
# make sure you use npm instead of yarn
cd ..
cd backend
npm install

# add environemnts and secrets files
cd environments
vim .env.development
vim .evn.production

cd ..
cd secrets
vim fullchain.pem
vim privkey.pem
vim solvedeep-base.json
vim solvedeep.json
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
npm start:staging
# for production server, run
npm start
```
