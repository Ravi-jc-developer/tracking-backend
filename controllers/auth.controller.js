import OTP from "../models/OTP.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res, next) => {
    try {
        const reqData = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { mobile: reqData.mobile },
                { email: reqData.email }
            ]
        });

        if (existingUser) {
            if (existingUser.mobile === reqData.mobile) {
                return res.status(400).json({
                    status: false,
                    message: "Mobile number already exists",
                });
            }

            if (existingUser.email === reqData.email) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists",
                });
            }
        }

        const data = {
            ...reqData,
        };

        const userCreated = await User.create(data);

        return res.status(201).json({
            status: true,
            message: "User Registered",
            data: userCreated,
        });
    } catch (error) {
        console.log("ERROR IN ", error);

        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                status: false,
                message: `${field} already exists`,
            });
        }

        next(error);
    }
};


export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })?.select(
            "-__v -createdAt -updatedAt",
        );

        if (!user) {
            return res.json({ status: false, message: "Invalid creadentials!" });
        }

        console.log(req.body, password, email, "pass")

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.json({ status: false, message: "Invalid creadentials!" });
        }

        const token = user.getToken();

        //   remove password
        const { password: _, ...userData } = user.toObject();

        const data = {
            ...userData,
            token,
        };

        return res
            .status(200)
            .json({ status: true, message: "Login Success", data });
    } catch (error) {
        next(error)
    }
};


// forget password apis
export const sendOTP = async (req, res) => {
    const { mobile } = req.body;

    // check if number exists
    const user = await User.findOne({ mobile });
    if (!user) res.status(200).json({ status: false, message: "User not found!" })

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const otpHash = await bcrypt.hash(otp, 10);

    await OTP.findOneAndUpdate(
        { mobile },
        {
            otpHash,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // after 5min
        },
        {
            upsert: true,
            returnDocument: "after"
        }
    );

    // await sendSMS(mobile, otp);

    res.json({
        status: true,
        message: "OTP sent",
        otp: otp,
    });
}

export const verifyOTP = async (req, res) => {
    const { mobile, otp } = req.body;

    const record = await OTP.findOne({ mobile });
    if (!record)
        return res.status(400).json({
            status: false,
            message: "OTP not found"
        });

    if (record.expiresAt < new Date())
        return res.status(400).json({
            status: false,
            message: "OTP expired"
        });

    const matched = await bcrypt.compare(
        otp,
        record.otpHash
    );

    if (!matched)
        return res.status(400).json({
            status: false,
            message: "Invalid OTP"
        });

    res.json({
        status: true
    });
}


export const updatePassword = async (req, res) => {
    // update password
    try {
        const { mobile, otp, password } = req.body;

        const hash = await bcrypt.hash(password, 12);
        const user = await User.updateOne(
            { mobile },
            { $set: { password: hash } }
        )

        if (user.modifiedCount > 0) {
            // delete otp
            await OTP.deleteOne({ mobile });

            return res.json({
                success: true,
                message: "Password reset successfully.",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Password could not be updated.",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}