import { Router } from "express";
import { registerUser, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { userRegisterValidator } from "../validators/index.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(userRegisterValidator(), validate, registerUser);

authRouter.route("/login").post(login);

export default authRouter;
