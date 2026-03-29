import express from "express";
import cors from "cors";


const app = express();

// Basic configurations
app.use(express.json({ limit: "16kb" })); // this allows the frontend to pass the data to the backend in the json format, and it can pass max 16kb of data
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import routes
import healtcheckRoutes from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck", healtcheckRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
