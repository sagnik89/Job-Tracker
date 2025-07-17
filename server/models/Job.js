import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: String,
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offer", "Rejected"],
    default: "Applied",
  },
  notes: String,

  appliedOn: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Job", jobSchema);
