import dotenv from "dotenv";
dotenv.config();
import { pool } from "./database/db.js";

export const getPosts = async () => {
  const consulta = "SELECT * FROM posts";
  const { rows } = await pool.query(consulta);
  //console.log(rows)
  return rows;
};

export const agregarPost = async (titulo, img, descripcion, likes) => {
  const consultas = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consultas, values);
  //console.log('equipo agregado)
};
