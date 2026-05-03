import { IUser } from "../models/user.models.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}