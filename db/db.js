// get the client
const mysql = require("mysql2/promise");
require("dotenv").config();
// create the connection to database
const connectionData = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
});
// function creating for checking which DB Connected
const DBconnection = async function main(data) {
  const connection = await connectionData;
  const [rows, fields] = await connection.execute(data);
  // await connection.end()
  return rows;
};
// Exporting the Data based Connection and Function
module.exports = DBconnection;