import postModel from "../models/posts.model.js";

//Leer posts
const read = async (req, res) => {
  try {
    const posts = await postModel.getAll();
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
//Leer post específico
const readById = async (req, res) => {
  try {
    const post = await postModel.getById();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Crear post
const create = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await postModel.agregar(
      post.titulo,
      post.img,
      post.descripcion,
      post.likes,
    );
    if (!newPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Modificar Post (agregar un like), ya implementado en front
const updateLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.modificarLikes(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Eliminar Post
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.eliminar(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Rutas Post que requieren modificación de componentes en front.
//Modifica un solo campo de forma dinámica via req.query (único)
const updateSingle = async (req, res) => {
  const { id } = req.params;
  const campo = Object.keys(req.query)[0];
  const valor = req.query[campo];
  try {
    const post = await postModel.modificarSingle(campo, valor, id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

//Modifica uno varios campos via req.query (flexible)
const updateMulti = async (req, res) => {
  const { id } = req.params;
  const modificados = req.query;
  try {
    const post = await postModel.modificarMulti(modificados, id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
//Modifica uno varios campos via via req.body
const updateAll = async (req, res) => {
  const { id } = req.params;
  const { titulo, img, descripcion, likes } = req.body;

  try {
    const post = await postModel.modificarVarios(
      titulo,
      img,
      descripcion,
      likes,
      id,
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const postController = {
  read,
  readById,
  create,
  updateLikes,
  updateSingle,
  updateMulti,
  updateAll,
  remove,
};

export default postController;
