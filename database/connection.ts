import * as mysql from 'mysql2';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const port = parseInt(process.env.port|| "3306")

export const connectionDatabase = mysql.createConnection({
  host: process.env.host||"localhost",
  user: process.env.user||"root",
  password: process.env.password,
  database: process.env.database||"web_kantor",
  port: 3306||port,
})

export const connectionPool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
