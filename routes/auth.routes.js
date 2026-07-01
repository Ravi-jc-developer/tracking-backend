import express from "express";
import { createUser, sendOTP, updatePassword, userLogin, verifyOTP } from "../controllers/auth.controller.js";
import { createUserSchema, loginUserSchema, sendOtpSchema, verifyOtpSchema } from "../schema/auth.schema.js";
import validate from "../middlewares/validate.middleware.js";
const router = express.Router();

router.post("/register", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), userLogin)

// forget pass routes
router.post("/send-otp", validate(sendOtpSchema), sendOTP);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOTP);
router.post("/reset-password", updatePassword);

export default router;