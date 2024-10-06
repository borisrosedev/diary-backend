import { body, param } from "express-validator";

const validatorMiddleware = {
    email: body("email").notEmpty().bail().trim().isEmail(),
    password: body("password").notEmpty().bail().trim().isStrongPassword({ minLength: 12 }),
    id: param("id").notEmpty().bail().trim().isAlphanumeric(),
    firstname: body("firstname").notEmpty().bail().trim().isAlpha(),
    lastname: body("lastname").notEmpty().bail().trim().isAlpha()
}

export default validatorMiddleware