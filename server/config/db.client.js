const { Client } = require('pg');
const dbConfig= require('./db.config');

const client=new Client({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

client.connect();
module.exports=client;