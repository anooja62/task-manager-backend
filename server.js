const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./src/routes/authRoutes"));
app.use("/tasks", require("./src/routes/taskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
