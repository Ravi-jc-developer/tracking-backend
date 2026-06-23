import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  agentId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Number,
    ref: "User",
    required: true,
    index: true,
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