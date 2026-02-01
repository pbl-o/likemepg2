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

export default router;
