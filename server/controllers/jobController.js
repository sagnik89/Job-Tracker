import Job from "../models/Job.js";

// Mocked userId for now
const mockUserId = "123456";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: mockUserId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createJob = async (req, res) => {
  const { company, position, location, status, notes, appliedOn } = req.body;

  try {
    const newJob = new Job({
      userId: mockUserId,
      company,
      position,
      location,
      status,
      notes,
      appliedOn,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: mockUserId },
      updates,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId: mockUserId,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const userId = mockUserId;

    const totalJobs = await Job.countDocuments({ userId });

    const statusCounts = await Job.aggregate([
      { $match: { userId } },
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

    statusCounts.forEach((stat) => {
      statusMap[stat._id] = stat.count;
    });

    res.json({
      totalJobs,
      statusBreakdown: statusMap,
      conversionRates: conversions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
