import dotenv from "dotenv";
dotenv.config();
import { pool } from "../database/db.js";

//metodos de consulta en SQL

//Obtener todos los datos.
const getAll = async () => {
  const consulta = "SELECT * FROM posts";
  const result = await pool.query(consulta);
  if (result.rowCount === 0) {
    throw new Error("No Posts found");
  }
  return result.rows;
};

//Obtener datos específico vía ID.
const getById = async (id) => {
  const consulta = "SELECT * FROM posts WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }
  return result.rows[0];
};

//Crear nuevo registro
const agregar = async (titulo, img, descripcion, likes = 0) => {
  const consulta =
    "INSERT INTO posts (id, titulo, descripcion, likes) values (DEFAULT, $1, $2, $3, $4) RETURNING *";
  const values = [titulo, img, descripcion, (likes = 0)];
  const result = await pool.query(consulta, values);
  console.log("Post Agregado");
  return result.rows[0];
};
//Modificar post (agregar like) -> *Método tipo PUT ya implementado en en front.
const modificarLikes = async (id) => {
  const consulta =
    "UPDATE posts SET likes = likes + 1  where id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }
  console.log("+1 like");

  return result.rows[0];
};
const eliminar = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }
  console.log("Post Eliminado ");
  return result.rows[0];
};

//Métodos implementados por backend (a incorporar al front)
//Métodos con base en investigación personal para modificar uno o varios registros.

//Para modificar un campo por ejecución.

// Método ascociado a ruta: PUT/posts/single/:id
const modificarSingle = async (campo, valor, id) => {
  //Se crea un array con los nombres de las columnas , para proteger contra inyección de SQL para el campo dinámico
  const camposEsperados = ["titulo", "img", "descripcion", "likes"];
  //Se captura error en caso de que el campo ingresado no corresponda a los campos válidos
  if (camposEsperados.indexOf(campo) === -1) {
    throw new Error("No valid column name");
  }

  //Se modela la consulta SQL como visto en clases.
  const consulta = `UPDATE posts SET ${campo} = $1 WHERE id = $2 RETURNING *`;
  const values = [valor, id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }
  console.log("Post modificado");
  return result.rows[0];
};


//Para modificar uno o varios campos por ejecución.

// Método ascociado a ruta: PUT/posts/multi/:id   (vía req.query)
const modificarMulti = async (campos, id) => {
    // array de columnas válidas
  const camposEsperados = ["titulo", "img", "descripcion", "likes"];

  const keys = Object.keys(campos).filter((key) =>
    camposEsperados.includes(key),
  );

  if (keys.length === 0) {
      throw new Error("No valid column name");
  }

  if (keys.length > camposEsperados.length) {
    throw new Error("Amount of fields exceeded");
  }

  // modelando campos
  //Columna
  const camposValidos = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  //Valor
  const values = keys.map((key) =>
    key === "likes" ? Number(campos[key]) : campos[key],
  );
  //Se agrega ID
  values.push(id);

  //Se modela la consulta
  const consulta = `UPDATE posts SET ${camposValidos} WHERE id = $${values.length} RETURNING *`;
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }

  return result.rows[0];
};

// Método ascociado a ruta: PUT/posts/todos/:id (vía req.body)
//Método con base en lo que fue visto en clases.
const modificarVarios = async (titulo, img, descripcion, likes, id) => {
  const consulta =
    "UPDATE posts SET (titulo =  COALESCE($1, titulo), img = COALESCE($2, img), descripcion = CAOLESCE($3, descripcion), likes = COALESCE($4, likes)) WHERE id = $5 RETURNING *";
  const values = [titulo, img, descripcion, likes, id];
  const result = await pool.query(consulta, values);

  if (result.rowCount === 0) {
    throw new Error("Post not found");
  }

  return result.rows[0];
};

const postModel = {
  getAll,
  getById,
  agregar,
  modificarLikes,
  eliminar,
  modificarSingle,
  modificarMulti,
  modificarVarios,
};

export default postModel;
