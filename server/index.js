import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { agregarPost, getPosts } from "./consultas.js";
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

//Port listener
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
