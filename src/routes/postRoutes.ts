import { Router } from "express";
import { PostController } from "../controller/PostController";

const router = Router();
const postController = new PostController();

router.get("/", postController.list);
router.post("/", postController.create);
router.patch("/:id", postController.update)
router.delete("/:id", postController.delet)

export const postRoutes = router;