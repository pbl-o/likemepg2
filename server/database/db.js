import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

const getDate = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(
      `Base de datos conectada con éxito! (Time: ${res.rows[0].now})`,
    );
  } catch (error) {
    console.log(error)
  }
};

getDate();
