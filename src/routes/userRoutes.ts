import { Router } from "express"
import { UserController } from "../controller/UserController"

const router = Router() 
const userController = new UserController()

router.post("/", (req, res) => userController.create(req, res))
router.get("/", (req, res) => userController.list(req, res))

export const userRoutes = Router()