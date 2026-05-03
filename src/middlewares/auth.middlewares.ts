import { User } from "../models/user.models";
import { ApiError } from "../utils/api-error";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    try {
      // ✅ Use the decoded variable you already have from jwt.verify
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        _id: string;
      };

      const user = await User.findById(decoded._id).select(
        // ✅ decoded not decode
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
      );

      if (!user) {
        throw new ApiError(401, "Invaid access token");
      }

      req.user = user;

      next();
    } catch (error) {
      throw new ApiError(401, "Invaid access token");
    }
  },
);
