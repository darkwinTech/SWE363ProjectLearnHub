const Notification = require('../model/Notification');

// send notification (used by other controllers)
exports.sendNotification = async (data) => {
  try {
    return await Notification.create(data);
  } catch (err) {
    console.error("Notification error:", err.message);
  }
};

// get logged in user notifications
exports.getMyNotifications = async (req, res) => {
  try {
    const list = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notif);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
