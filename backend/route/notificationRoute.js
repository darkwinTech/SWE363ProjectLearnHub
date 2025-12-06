const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { allowRoles } = require('../middleware/roles');
const convertingResponse = require('../middleware/convertingResponse');
const controller = require('../controller/notificationController');

// Get logged in user notifications
router.get('/', auth, allowRoles('student', 'tutor', 'admin'), convertingResponse(controller.getMyNotifications));

// Mark one notification as read
router.put('/:id', auth, allowRoles('student', 'tutor', 'admin'), convertingResponse(controller.markAsRead));

module.exports = router;
