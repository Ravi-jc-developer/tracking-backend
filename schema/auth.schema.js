import { z } from "zod"

export const loginUserSchema = z.object({
    // mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits").optional(),
    email: z.string().email().optional(),
    password: z.string().optional()
})


export const createUserSchema = loginUserSchema.extend({
    name: z.string().min(3).max(20).optional(),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits").optional(),
    role: z.enum(["survey", "sales"]),
    password: z.string().refine(
        (v) => v.length >= 6 && v.length <= 15,
        "Password must be 6 to 15 characters long"
    )
})

export const sendOtpSchema = z.object({
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
})

export const verifyOtpSchema = sendOtpSchema.extend({
    otp: z.string().regex(/^[0-9]{4}$/, "OTP must be 4 digits")
})