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
