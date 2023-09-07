import { Router } from "express";
import { deleteUser, signup } from "./controller/auth.controller.js";
import { validate } from "../../middleware/authenticate.js";
import { signinValidation, signupValidation } from "./controller/auth.validation.js";


const authRouter = Router()

authRouter.post("/signup", validate(signupValidation), signup)
authRouter.post("/signin", validate(signinValidation), signup)
authRouter.delete("/:id", deleteUser)

export default authRouter;