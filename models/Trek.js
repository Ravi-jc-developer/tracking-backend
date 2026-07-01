import mongoose from "mongoose";

const trekSchema = new mongoose.Schema({
    agentId: {
        type: String,
        ref: "User",
        required: true,
        index: true,
    },
    startedAt: {
        type: Date,
        required: false,
    },
    endedAt: {
        type: Date,
        required: false
    },
    distance: {
        type: Number,
        default: 0
    },
    lastCoord: {
        lat: Number,
        lng: Number,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        required: true,
    },
});

export default mongoose.model("Trek", trekSchema);