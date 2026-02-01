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

export const modificarPost = async (campo, valor, id) => {
  //protección contra inyección  de sql
  const fields = ["titulo", "img", "descripcion", "likes"];

  // refirmarar que el existe
  if (fields.indexOf(campo) === -1) {
    throw new Error("Campo no valido");
  }

  //insertar el campo en la consulta
  const consulta = `UPDATE posts SET ${campo} = $1 WHERE id = $2`;
  const values = [valor, id];

  //
  try {
    const result = await pool.query(consulta, values);
    console.log(result);
    if (result.rowCount === 0) {
      console.log("no se encontró un post con el Id requrido");
      throw new Error("Post no encontrado");
    }
  } catch (error) {
    console.log(`error al modificar el post, ${error}`);
    throw { error: error.message };
  }
};

export const eliminarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";

  try {
    const result = await pool.query(consulta, [id]);

    if (result.rowCount === 0) {
      throw new Error("post no encontrado");
    }

    console.log("viaje eliminado");
  } catch (error) {
    throw { error: error.message };
  }
};

export const modificarPostMulti = async (campos, id) => {
  //protección contra inyección  de sql
  const fields = ["titulo", "img", "descripcion", "likes"];

  //filtramos
  const keys = Object.keys(campos).filter((key) => fields.includes(key));

  // caso para situación sin casos validos:
  if (keys.length === 0) throw new Error("No hay campos validos");

  //consturir fields de consulta y values
  const validFields = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");
  const values = keys.map((key) =>
    key === "likes" ? Number(campos[key]) : campos[key],
  );
  values.push(id);

  const consulta = `UPDATE posts SET ${validFields} WHERE id = $${values.length}`;

  try {
    const result = await pool.query(consulta, values);
    if (result.rowCount === 0) throw new Error("Post no encontrado");
    console.log("Post modificado");
  } catch (error) {
    console.log(`Error al modificar el post ${error}`);
    throw new Error(error.message);
  }
};


export const modificarPostVarios = async(titulo, img, descripcion, likes, id) =>{
try {
    const consulta = `UPDATE posts SET titulo = COALESCE($1, titulo), img = COALESCE($2, img), descripcion = COALESCE($3, descripcion), likes = COALESCE($4,likes) WHERE id = $5`
  const values = [titulo, img, descripcion, likes, id]
  await pool.query(consulta, values)
  console.log('campos de post modificado con exito ')
} catch (error) {
  console.log(error)
  throw new Error(error.message)
}
  
}