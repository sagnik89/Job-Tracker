import { Job } from "../models/jobModel.js";
import mongoose from "mongoose";

// gets all the job of the specifc user
export const getJobs = async (req, res) => {
  const currentUserId = req.user.userId;

  let queryObject = {
    userId: currentUserId,
  };
  
  // word searching
  const searchTerm = req.query.search;
  if (searchTerm) {
    queryObject.$or = [
      { position: { $regex: searchTerm, $options: "i" } },
      { company: { $regex: searchTerm, $options: "i" } },
      { location: { $regex: searchTerm, $options: "i" } },
    ];

  }

  // status filtering
  const statusQueryTerm = req.query.status;
  if (statusQueryTerm) {
    queryObject.status = statusQueryTerm; //adding status property to the queryObject

  }

  const sortTerm = req.query.sort;
  let sortOption;
  if (sortTerm) {
    switch (sortTerm) {
      case "latest":
        sortOption = "-createdAt";
        break;
      case "oldest":
        sortOption = "createdAt";
        break;
      case "a-z":
        sortOption = "position";
        break;
      case "z-a":
        sortOption = "-position";
        break;
      default:
        sortOption = "-createdAt";
    }
  }

  // TODO:need to update the page and limit input validation

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const totalSkips = (page - 1) * limit

  try {
    const jobs = await Job.find(queryObject)
      .sort(sortOption)
      .skip(totalSkips)
      .limit(limit)
      .lean() // optimization, database does not return the whole meta data 

    if (!jobs) {
      return res.status(200).json({ message: "No jobs yet !" });
    }

    const totalJobs = await Job.countDocuments({ userId: currentUserId });

    const totalPages = Math.ceil(totalJobs / limit)


    res.status(200).json({
      jobs,
      totalJobs,
      totalPages,
      page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// creates a job for the specific user
export const createJob = async (req, res) => {
  const { company, position, location, status, notes, appliedOn } = req.body;
  const currentUserId = req.user.userId;

  try {
    const newJob = await Job.create({
      userId: currentUserId,
      company,
      position,
      location,
      status,
      notes,
      appliedOn,
    });

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (err) {
    res.status(500).json({ error: ["Internal Server Error", err.message] });
  }
};

// updates a job
export const updateJob = async (req, res) => {
  const currentUserId = req.user.userId;

  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: currentUserId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete a specific job
export const deleteJob = async (req, res) => {
  const currentUserId = req.user.userId;

  const { id } = req.params;

  try {
    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId: currentUserId,
    });

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get job stats for a specific user
export const getJobStats = async (req, res) => {
  const currentUserId = req.user.userId;

  try {
    const userId = currentUserId;

    const totalJobs = await Job.countDocuments({ userId });

    const statusCounts = await Job.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(String(userId)) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusMap = {
      Applied: 0,
      Interviewing: 0,
      Offer: 0,
      Rejected: 0,
    };

    statusCounts.forEach((stat) => {
      statusMap[stat._id] = stat.count;
    });

    const applied = statusMap.Applied || 0;
    const interviewing = statusMap.Interviewing || 0;
    const offer = statusMap.Offer || 0;

    const conversions = {
      appliedToInterviewing: applied
        ? ((interviewing / applied) * 100).toFixed(1)
        : "0.0",
      interviewingToOffer: interviewing
        ? ((offer / interviewing) * 100).toFixed(1)
        : "0.0",
      appliedToOffer: applied ? ((offer / applied) * 100).toFixed(1) : "0.0",
    };

    res.status(200).json({
      totalJobs,
      statusBreakdown: statusMap,
      conversionRates: conversions,
    });
  } catch (err) {
    res.status(500).json({ error: ["Internal Server Error", err.message] });
  }
};
