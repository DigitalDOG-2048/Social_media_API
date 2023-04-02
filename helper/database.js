/**
 * @module helper/database
 * @author Longhui Huang
 * @see models
 */

const mysql = require('promise-mysql');
const info = require('../config');

/**
 * 
 * @param {string} query 
 * @param {Array|number|string} values 
 * @returns {object}
 */


exports.sql_query = async function sql_query(query, values) {
  try {
    const connection = await mysql.createConnection(info.config);
    const data = await connection.query(query, values);
    await connection.end();
    //console.log(query, values)
    //console.log('datebase mondified.')
    return data;
  }
  catch (error) {
    //console.error(query, values)
    //console.error("database error.");
    return error
  }
}

