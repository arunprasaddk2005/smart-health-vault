const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { firebaseUid, email, fullName, phone, dateOfBirth } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ firebaseUid }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = new User({
            firebaseUid,
            email,
            fullName,
            phone,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            lastLogin: new Date()
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.uid;
        const updates = req.body;

        const user = await User.findOneAndUpdate(
            { firebaseUid: userId },
            { $set: updates, lastLogin: new Date() },
            { new: true, select: '-__v' }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUid: userId }).select('-__v');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerUser, updateUserProfile, getUserProfile };