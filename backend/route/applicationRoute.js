const express = require("express");
const router = express.Router();
const { getAllApplications, updateApplicationStatus } = require("../controller/applicationController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");

// Get all applications
router.get("/", auth, allowRoles("admin"), getAllApplications);

// Update application status 
router.put("/status/:id", auth, allowRoles("admin"), updateApplicationStatus);

module.exports = router;
