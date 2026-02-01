import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import postRouter from "./routes/posts.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use("/posts", postRouter);

//Test para ver servidor funcionando en Browser
app.get("/", (req, res) => {
  res.status(200).json({ message: "Página funcionando" });
});

//Port listener
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
