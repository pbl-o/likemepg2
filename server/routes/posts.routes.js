import postController from "../controllers/posts.controllers.js";
import { Router } from "express";

const router = Router();

//RUTAS

router.get("/", postController.read);
router.get("/:id", postController.readById);
router.post("/", postController.create);
router.put("/like/:id", postController.updateLikes);
router.delete("/:id", postController.remove);
router.put("/single/:id", postController.updateSingle);
router.put("/multi/:id", postController.updateMulti);
router.put("/todos/:id", postController.updateAll);

/*

La única ruta PUT conectada a front previamente implementado
es /like/:id, esto para efectos de crear una ruta PUT tal cual a las
trabajadas en las guías. 

rutas PUT /single/:id, /multi/:id 
Son intentos de hacer una ruta PUT dinámica utilzando
herramientas encontradas además de lo visto en clase (usando req.query).

la ruta PUT /todos/:id es un intento de hacer lo mismo
con lo que hemos visto en clase (usando req.body)
*/

export default router;
