/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import admin = require('firebase-admin')
import { getEnv } from '../utils/getEnv'

const serviceAccount = require(getEnv().SERVICE_ACCOUNT)

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: getEnv().DATABASE_URL,
    storageBucket: getEnv().STORAGE_BUCKET,
  })
}

export const firebaseAdmin = admin
