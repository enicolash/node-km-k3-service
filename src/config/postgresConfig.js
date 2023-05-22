const { Pool } = require('pg');


// Create a new pool instance
const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    idleTimeoutMillis: 30000, // Set the idle timeout to 30 seconds (30000 milliseconds),
    connectionTimeoutMillis: 5000, // Set the connection timeout to 5 seconds (5000 milliseconds)
    max: 2, // Set the maximum pool size to 10 connections
    min: 1, // Set the minimum pool size to 2 connections
});


module.exports = pool;