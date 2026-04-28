import { Router } from "express"
import { UserController } from "../controller/UserController"

const router = Router() 
const userController = new UserController()

router.post("/", userController.create)
router.patch("/:id/toggle", userController.toggleActive)
router.patch("/:id", userController.update)
router.get("/", userController.list)
router.get("/active", userController.listActive)
router.get("/:id", userController.listById)
router.delete("/:id", userController.delete)

export const userRoutes = router