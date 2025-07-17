import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

// TODO: connect mongoose
connectDB();

// middleware 
app.use(cors())
app.use(express.json())

// TODO: Apply Routes
app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
  res.send("Job Tracker API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});