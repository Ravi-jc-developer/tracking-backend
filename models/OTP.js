import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobile: String,
    otpHash: String,
    expiresAt: Date,
    attempts: {
        type: Number,
        default: 0,
    }
})

export default mongoose.model('OTP', otpSchema);