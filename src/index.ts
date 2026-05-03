import "dotenv/config"; // ✅ this loads env vars before anything else in ESM

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION TYPE:", err?.constructor?.name);
  console.error("UNCAUGHT EXCEPTION:", JSON.stringify(err, null, 2));
  console.error("UNCAUGHT MESSAGE:", err?.message);
  console.error("UNCAUGHT STACK:", err?.stack);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION:", error);
  console.log("ERROR MESSAGE:", error.message);
  console.log("ERROR STACK:", error.stack);
});

process.on("unhandledRejection", (reason) => {
  console.log("UNHANDLED REJECTION:", reason);
});

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
