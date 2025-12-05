const express = require("express");
const router = express.Router();
const session= require("../controller/sessionController");
const convertingResponse = require("../middleware/convertingResponse");

router.post("/admin-edit-session", convertingResponse(session.updateSession));
router.post("/admin-delete-session", convertingResponse(session.deleteSession));

router.post("/totur-edit-session", convertingResponse(session.updateSession));
router.post("/totur-delete-session", convertingResponse(session.deleteSession));
router.post("/totur-create-session", convertingResponse(session.createSession));

router.get("/read-session", convertingResponse(session.readSession));

module.exports = router;