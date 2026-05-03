/*
import dotenv from "dotenv";


dotenv.config({
  path: "./.env",
});

import app from "./app.js";
import connectDB from "./db/index.js";

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend is running on the port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
    process.exit(1);
  });
*/

import "dotenv/config"; // ✅ this loads env vars before anything else in ESM

import app from "./app.js";
import connectDB from "./db/index.js";

// Add this temporarily
console.log("ENV CHECK:", {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
});

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend is running on the port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error", error);
    process.exit(1);
  });
