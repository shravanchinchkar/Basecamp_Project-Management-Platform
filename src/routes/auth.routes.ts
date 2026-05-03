import { Router } from "express";
import { registerUser, login, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  userRegisterValidator,
  userLoginValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter
  .route("/register")
  .post(userRegisterValidator(), validate, registerUser);

authRouter.route("/login").post(userLoginValidator(), validate, login);
authRouter.route("/logout").post(verifyJWT,logout);

export default authRouter;
