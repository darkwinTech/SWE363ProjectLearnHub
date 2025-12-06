const Notification = require('../model/Notification');
const mongoose = require('mongoose');

/**
 * Send notification (used by other controllers)
 * @param {Object} data
 * @returns
 */
const sendNotification = async (data) => {
  try {
    return await Notification.create(data);
  } catch (err) {
    console.error("Notification error:", err.message);
    return null;
  }
};

/**
 * Get logged in user's notifications
 * @param {Request} req
 * @param {Response} res 
 * @returns
 */
const getMyNotifications = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const list = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    
    return [200, list, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

/**
 * Mark a notification as read
 * @param {Request} req
 * @param {Response} res 
 * @returns
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return [400, { "message": "Notification ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return [400, { "message": "Notification ID is not valid." }, null];
    }

    const notif = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notif) {
      return [404, { "message": "Notification not found." }, null];
    }

    console.log("Notification marked as read");
    return [200, notif, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

module.exports = {
  sendNotification,
  getMyNotifications,
  markAsRead
};
