import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const application_schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company_name: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["applied", "interview", "rejected", "accepted"],
      default: "applied",
      index: true,
    },

    applied_at: {
      type: Date,
      default: Date.now,
    },

    application_link: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", application_schema);