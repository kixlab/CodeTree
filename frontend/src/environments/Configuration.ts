export const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS ?? 'http://localhost:8080'
export const PRODUCTION = process.env.REACT_APP_PRODUCTION ?? false

console.log(SERVER_ADDRESS, PRODUCTION)
