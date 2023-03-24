const mysql = require('promise-mysql');
const info = require('../config');

exports.sql_query = async function sql_query(query, values) {
  try {
    const connection = await mysql.createConnection(info.config);
    const data = await connection.query(query, values);
    await connection.end();
    return data;
  }
  catch (error) {
    console.error(query, values)
    console.error("database error.");
  }
}

