import express from "express";
import cors from "cors";

const app = express();

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// importing user routes
import userRoutes from "./Routes/user.routes.js";

// using routes
app.use("/api/v1/users", userRoutes);

export { app };
