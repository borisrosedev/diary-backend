import { Router } from "express"
import userController from "../controllers/user.controller.js"
import validatorMiddleware from "../middlewares/validator.middleware.js"
import errorMiddleware from "../middlewares/error.middleware.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const route = Router()

route.post("/login", [ validatorMiddleware.email, validatorMiddleware.password, errorMiddleware.validator ], userController.login)
route.post("/register",[ validatorMiddleware.firstname, validatorMiddleware.lastname, validatorMiddleware.email, validatorMiddleware.password, errorMiddleware.validator ], userController.createOne)
route.get("/:id", validatorMiddleware.id,  errorMiddleware.validator, authMiddleware, userController.getOneById)
route.get("/", userController.getAll)

export default route