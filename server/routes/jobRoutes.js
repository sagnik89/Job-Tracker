import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} from "../controllers/jobController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// base api -> /api/jobs

router.use(verifyToken) // authentication

router.get("/", getJobs); // GET all jobs
router.get("/stats", getJobStats); // GET job stats 

router.post("/", createJob); // POST new job

router.put("/:id", updateJob); // PUT update job

router.delete("/:id", deleteJob); // DELETE job


export default router;
