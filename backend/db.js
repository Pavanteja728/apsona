import dotenv from "dotenv";
dotenv.config();
import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

pool.getConnection().then((connection) => {
  console.log("Berhasil terhubung ke database.");
  connection.release();
});
export default pool;
