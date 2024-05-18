const pg = require('pg');
let dotenv = require("dotenv");
dotenv.config();

let config = {
    user: process.env.NODE_ENV_SERVER_USER,
    host: process.env.NODE_ENV_SERVER_HOST,
    database: process.env.NODE_ENV_SERVER_DATABASE,
    password: process.env.NODE_ENV_SERVER_PASSWORD,
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000, 
};

const pool = new pg.Pool(config);
pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;