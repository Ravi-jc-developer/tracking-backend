import User from '../models/User.js';

export const updateProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image uploaded.',
            });
        }

        const imageUrl = `${req.protocol}://${req.get(
            'host'
        )}/uploads/profile/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            id,
            {
                profileImage: imageUrl,
            },
            { returnDocument: "after" }
        );
        console.log("user in update profile ",user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        return res.json({
            success: true,
            message: 'Profile image updated successfully.',
            data: user,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};