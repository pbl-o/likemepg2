import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  agregarPost,
  getPosts,
  eliminarPost,
  modificarPost,
  modificarPostMulti,
  modificarPostVarios,
} from "./consultas.js";
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Página funcionando" });
});

//Obtener posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
});

app.get("/posts/:id", (req, res) => {});

//Crear un nuevo post
app.post("/posts", async (req, res) => {
  try {
    const post = req.body;
    await agregarPost(post.titulo, post.img, post.descripcion, post.likes);
    return res.status(201).json({ message: "Post creado exitosamente" });
  } catch (error) {
    res.status(500).send({ message: "Error del servidor", error });
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const campo = Object.keys(req.query)[0];
  const valor = req.query[campo];

  try {
    await modificarPost(campo, valor, id);
    return res.status(200).json({ message: "post modificado con éxito" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/posts/multi/:id", async (req, res) => {
  const { id } = req.params;
  const modificados = req.query;

  try {
    await modificarPostMulti(modificados, id);
    res.status(200).json({ messagge: "Post modificado con éxito" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/posts/varios/:id", async (req, res) => {
  const { id } = req.params;
  const {titulo, img, descripcion, likes} = req.body;

  try {
    await modificarPostVarios(titulo, img, descripcion, likes, id);
    res.status(200).json({ messagge: "Post modificado con éxito" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await eliminarPost(id);
    res.status(200).json({ message: "post elimiando correctamente" });
  } catch (error) {
    res.status(404).send(error);
  }
});

//Port listener
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
