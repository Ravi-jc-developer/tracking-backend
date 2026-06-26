import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  agentId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
    index: true,
  },

  trekId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Trek",
    required: true
  },

  latitude: {
    type: Number,
    required: true,
  },

  longitude: {
    type: Number,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.model("Location", locationSchema);