export function getConfig() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN,
    ALLOW_METHODS: process.env.ALLOW_METHODS,
    ALLOW_HEADERS: process.env.ALLOW_HEADERS,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USERNAME: process.env.DB_USERNAME,
    LOGGING: process.env.DB_LOGGING,
  };
}
