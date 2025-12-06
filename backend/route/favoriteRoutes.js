const express = require("express");
const router = express.Router();
const favoriteController = require("../controller/favoriteController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");
const convertingResponse = require("../middleware/convertingResponse");

// /api/favorites
router.get("/", auth, allowRoles("student", "tutor"), convertingResponse(favoriteController.getFavorites));

// /api/favorites/courses/:courseId
router.post("/courses/:courseId", auth, allowRoles("student", "tutor"), convertingResponse(favoriteController.addFavoriteCourse));

// /api/favorites/courses/:courseId
router.delete("/courses/:courseId", auth, allowRoles("student", "tutor"), convertingResponse(favoriteController.removeFavoriteCourse));

// /api/favorites/tutors/:studentId
router.post("/tutors/:studentId", auth, allowRoles("student", "tutor"), convertingResponse(favoriteController.addFavoriteTutor));

// /api/favorites/tutors/:studentId
router.delete("/tutors/:studentId", auth, allowRoles("student", "tutor"), convertingResponse(favoriteController.removeFavoriteTutor));

module.exports = router;
