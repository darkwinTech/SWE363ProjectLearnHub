const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/notificationController');

// get logged in user notifications
router.get('/', auth, controller.getMyNotifications);

// mark one notification as read
router.put('/:id', auth, controller.markAsRead);

module.exports = router;
