const Reminder = require('../models/Reminder');
const User = require('../models/User');
const cron = require('node-cron');

const createReminder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const reminderData = req.body;

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const reminder = new Reminder({
            userId: user._id,
            ...reminderData,
            scheduledFor: new Date(reminderData.scheduledFor)
        });

        await reminder.save();

        res.status(201).json({
            message: 'Reminder created successfully',
            reminder
        });
    } catch (error) {
        console.error('Create reminder error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getReminders = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { status, type, startDate, endDate } = req.query;

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const query = { userId: user._id };

        if (status) {
            query.status = status;
        }

        if (type) {
            query.type = type;
        }

        if (startDate || endDate) {
            query.scheduledFor = {};
            if (startDate) query.scheduledFor.$gte = new Date(startDate);
            if (endDate) query.scheduledFor.$lte = new Date(endDate);
        }

        const reminders = await Reminder.find(query)
            .sort({ scheduledFor: 1 })
            .limit(100);

        res.json({ reminders });
    } catch (error) {
        console.error('Get reminders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateReminder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { reminderId } = req.params;
        const updates = req.body;

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (updates.scheduledFor) {
            updates.scheduledFor = new Date(updates.scheduledFor);
        }

        const reminder = await Reminder.findOneAndUpdate(
            {
                _id: reminderId,
                userId: user._id
            },
            {
                $set: { ...updates, updatedAt: new Date() }
            },
            { new: true }
        );

        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        res.json({
            message: 'Reminder updated successfully',
            reminder
        });
    } catch (error) {
        console.error('Update reminder error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteReminder = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { reminderId } = req.params;

        const user = await User.findOne({ firebaseUid: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const reminder = await Reminder.findOneAndDelete({
            _id: reminderId,
            userId: user._id
        });

        if (!reminder) {
            return res.status(404).json({ error: 'Reminder not found' });
        }

        res.json({
            message: 'Reminder deleted successfully'
        });
    } catch (error) {
        console.error('Delete reminder error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Check for due reminders (to be called by a cron job)
const checkDueReminders = async () => {
    try {
        const now = new Date();
        const dueDate = new Date(now.getTime() + 30 * 60 * 1000); // Next 30 minutes

        const dueReminders = await Reminder.find({
            scheduledFor: { $lte: dueDate, $gte: now },
            status: 'Pending'
        }).populate('userId', 'email fullName');

        // Here you would integrate with a notification service
        // For now, just log the due reminders
        console.log(`Found ${dueReminders.length} due reminders`);

        return dueReminders;
    } catch (error) {
        console.error('Check due reminders error:', error);
    }
};

// Schedule reminder checks (runs every minute)
cron.schedule('* * * * *', checkDueReminders);

module.exports = {
    createReminder,
    getReminders,
    updateReminder,
    deleteReminder,
    checkDueReminders
};