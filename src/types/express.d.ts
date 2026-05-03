/*
import { IUser } from "../models/user.models.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {}; // ✅ this line is missing - add it
*/

import { IUser } from "../models/user.models.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};