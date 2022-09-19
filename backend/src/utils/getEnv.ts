export function getEnv() {
  return {
    SERVICE_ACCOUNT: process.env.SERVICE_ACCOUNT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET as string,
    PORT: Number(process.env.PORT),
    PRODUCTION: process.env.PRODUCTION === 'true',
    SSL_KEY: process.env.SSL_KEY as string,
    SSL_CERT: process.env.SSL_CERT as string,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
    ETRI_API_KEY: process.env.ETRI_API_KEY as string,
  }
}
