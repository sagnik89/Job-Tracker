import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs); // GET all jobs
router.post("/", createJob); // POST new job
router.put("/:id", updateJob); // PUT update job
router.delete("/:id", deleteJob); // DELETE job
router.get("/stats", getJobStats); // GET job stats 


export default router;
