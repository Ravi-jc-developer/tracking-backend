import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      index: true,
      match: [/^\d{10}$/, "10 digit mobile number is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Valid email address is required",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["survey", "sales"],
      required: true,
    },

    profileImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// -------- Hash password before save --------
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

// -------- Compare password --------
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// -------- Generate JWT Token --------
userSchema.methods.getToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.COOKIE_EXPIRE}`,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;