import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000


connectDB();

// middleware 
app.use(cors());
app.use(express.json())

// Use job routes
app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
  res.send("Job Tracker API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});