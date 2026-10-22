import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

export default app;