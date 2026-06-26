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
    status: {
        type: String,
        enum: ["active", "completed"],
        required: true,
    },
});

export default mongoose.model("Trek", trekSchema);