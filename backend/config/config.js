require('dotenv').config();

const base = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'arcgis',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {}
};

if (process.env.DB_SSL === 'true') {
  base.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false
  };
}

module.exports = {
  development: base,
  test: base,
  production: base
};

