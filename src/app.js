import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();


//app.use(cors());

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);



export default app;
app.get("/", (req, res) => {
    res.send("Welcome to Task Manager");
});
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


