const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  ALLOW_ORIGIN: process.env.ALLOW_ORIGIN,
  ALLOW_METHODS: process.env.ALLOW_METHODS,
  ALLOW_HEADERS: process.env.ALLOW_HEADERS,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
