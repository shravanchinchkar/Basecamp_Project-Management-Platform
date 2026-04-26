import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";

// 1. Define an interface for the User document
export interface IUser extends Document {
  avatar: {
    url: string;
    localPath: string;
  };
  username: string;
  email: string;
  fullname?: string;
  password: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
}

const userSchema = new Schema<IUser>(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: { type: String },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: Date },
  },
  { timestamps: true },
);

// 2. Type `this` explicitly as IUser in the pre-save hook
userSchema.pre<IUser>("save", async function (this: IUser) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: any) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const options: SignOptions = {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRY ||
      "1d") as SignOptions["expiresIn"],
  };
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    options,
  );
};

userSchema.methods.generateRefereshToken = function () {
  const options: SignOptions = {
    expiresIn: (process.env.REFERESH_TOKEN_EXPIRY ||
      "1d") as SignOptions["expiresIn"],
  };

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFERESH_TOKEN_SECRET!,
    options,
  );
};

userSchema.methods.generateTemperoryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 min

  return {unHashedToken,hashToken,tokenExpiry};
  
};

export const User = mongoose.model<IUser>("User", userSchema);
