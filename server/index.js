import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express()
const PORT = process.env.PORT || 5000


connectDB();

// middleware 
app.use(cors());
app.use(express.json())

// Auth Routes
app.use("/api/auth", authRoutes)

// Job Routes
app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
  res.send("Job Tracker API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});