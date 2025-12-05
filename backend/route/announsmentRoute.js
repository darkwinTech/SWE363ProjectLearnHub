const express = require("express");
const router = express.Router();
const Announcement= require("../controller/announsmentController");
const convertingResponse = require("../middleware/convertingResponse");

router.post("/admin/make-announcement",convertingResponse(Announcement.createAnnouncement));

router.get("/view-announcement", convertingResponse(Announcement.readAnnouncement));

module.exports = router;