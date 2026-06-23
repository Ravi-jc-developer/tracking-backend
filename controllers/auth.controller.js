import User from "../models/User.js";

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

    console.log(req.body,password, email, "pass")

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