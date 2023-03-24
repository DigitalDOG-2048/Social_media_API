const mysql = require('promise-mysql');
const info = require('../config');

export.sql_query = async function sql_query(query, values)
{
  try
  {
    const connection = await mysql.createConnection(info.config);
    const data = await connection.query(query, values);
    await connection.end();
    return data;
  }
  catch(error)
  {
    throw "database error."
  }
}