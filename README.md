# Chat Application Service

## General Stack

- Language: NodeJS
- Framework : ExpressJS
- DB: Firebase

## URI

- Staging : https://nodejs-cs1-chatapp-api-staging.herokuapp.com/
- Production : https://nodejs-cs1-chatapp-api.herokuapp.com/

## Git flow

- Read [the topic](https://medium.com/@mattia.battiston/why-i-love-trunk-based-development-641fcf0b94a0) about **trunk based development**

```bash
git push --set-upstream origin development
```

## Getting start

```bash
yarn add express

# dependency packages for app
yarn add dotenv
yarn add firebase-admin

yarn install

yarn watch:dev
```

## Views

- https://ejs.co/#install
- https://scotch.io/tutorials/use-ejs-to-template-your-node-application

## Testing

- https://jestjs.io/docs/en/getting-started.html

- [Mock? What, When, How?](https://blog.codecentric.de/en/2018/03/mock-what-when-how/)

## Rules

- dotenv : https://www.npmjs.com/package/dotenv

## Local

```bash
APP_ENV=LOCAL
DEBUG=true
FIREBASE_SERVICE_ACCOUNT=/mnt/e/code/ezcoder/cs1/nodejs/headfirst/chatapp/api/firebaseServiceAccountKey.json
```

## Heroku setup

```bash
heroku login
# app
heroku run db_upgrade
```

**ENV CONFIG**

```env
APP_ENV=Heroku
DEBUG=true
GOOGLE_APPLICATION_CREDENTIALS={base64string}
GAC_TYPE=string
FIREBASE_DATABASE_NAME={DB_NAME}
```

### REST API Design

```bash

```

### Firebase Custom Auth

- Official Doc : https://firebase.google.com/docs/auth/admin/create-custom-tokens
