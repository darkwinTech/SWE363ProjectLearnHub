const express = require('express');
const router = express.Router();
const applicationController = require('../controller/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); 

// show all pending applications 
router.get('/pending', authMiddleware, adminMiddleware, applicationController.getPendingApplications);

// approve an application
router.patch('/approve/:id', authMiddleware, adminMiddleware, applicationController.approveApplication);

// reject an application
router.patch('/reject/:id', authMiddleware, adminMiddleware, applicationController.rejectApplication);

module.exports = router;