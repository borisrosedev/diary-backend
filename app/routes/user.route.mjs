import { Router } from "express";
import userController from "../controllers/user.controller.mjs";
import validatorMiddleware from "../middlewares/validator.middleware.mjs";
import errorMiddleware from "../middlewares/error.middleware.mjs";
import authMiddleware from "../middlewares/auth.middleware.mjs";

const route = Router();

route.post(
  "/login",
  [
    validatorMiddleware.email,
    validatorMiddleware.password,
    errorMiddleware.validator,
  ],
  userController.login,
);
route.post(
  "/register",
  [
    validatorMiddleware.firstname,
    validatorMiddleware.lastname,
    validatorMiddleware.email,
    validatorMiddleware.password,
    errorMiddleware.validator,
  ],
  userController.createOne,
);
route.get(
  "/:id",
  validatorMiddleware.id,
  errorMiddleware.validator,
  authMiddleware,
  userController.getOneById,
);
route.get("/", userController.getAll);

export default route;
