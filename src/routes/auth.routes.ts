import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  getCurrentUser,
  changeCurrentPassword,
  resendEmailVerification,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middlewares.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userFrogotPasswordValidator,
  userResetForgotPasswordValidator,
  userChangedCurrentPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

// unsecured routes
authRouter
  .route("/register")
  .post(userRegisterValidator(), validate, registerUser);
authRouter.route("/login").post(userLoginValidator(), validate, login);
authRouter.route("/verify-email/:verificationToken").get(verifyEmail);
authRouter.route("/refres-token").post(refreshAccessToken);
authRouter
  .route("/forgot-password")
  .post(userFrogotPasswordValidator(), validate, forgotPasswordRequest);

authRouter
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);


  
// secure routes
authRouter.route("/logout").post(verifyJWT, logout);
authRouter.route("/current-user").get(verifyJWT, getCurrentUser);
authRouter
  .route("/change-password")
  .post(
    verifyJWT,
    userChangedCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
authRouter
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default authRouter;
