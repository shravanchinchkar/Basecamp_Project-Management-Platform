import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import { userRegisterValidator } from "../validators/index.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(userRegisterValidator(), validate, registerUser);

export default authRouter;
