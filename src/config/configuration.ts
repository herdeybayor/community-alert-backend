export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNC === 'true',
  },
  jwt: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    access_token_expiration: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT, 10) || 587,
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
    secure: process.env.MAILER_SECURE === 'true',
  },
});
