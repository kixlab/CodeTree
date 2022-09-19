/* eslint-disable @typescript-eslint/no-var-requires */
const whitelist = ['*']
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes('*')) {
      callback(null, true)
    } else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
// eslint-disable-next-line global-require
export const cors = require('cors')(corsOptions)
