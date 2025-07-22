import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
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
      // required: true,
    },
  },
  { timestamps: true }
);



export const Job = mongoose.model("Job", jobSchema);
