require('dotenv').config()

const config = {
  debug: true,
  port: process.env.DB_PORT,
  mysql: {
    HOST: process.env.DB_HOST,
    USERNAME: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
  },
};

module.exports = config;