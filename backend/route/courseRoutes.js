const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/roles");
const convertingResponse = require("../middleware/convertingResponse");

// GET /api/courses 
router.get("/", convertingResponse(courseController.getAllCourses));

// GET /api/courses/courseId/:courseId
router.get("/courseId/:courseId", auth, allowRoles("student", "tutor", "admin"), convertingResponse(courseController.getCourseByCourseId));

// POST /api/courses
router.post("/", auth, allowRoles("admin"), convertingResponse(courseController.createCourse));

// PUT /api/courses/:id
router.put("/:id", auth, allowRoles("admin"), convertingResponse(courseController.updateCourse));

// DELETE /api/courses/:id
router.delete("/:id", auth, allowRoles("admin"), convertingResponse(courseController.deleteCourse));

// GET /api/courses/department/:department
router.get("/department/:department", convertingResponse(courseController.getCoursesByDepartment));

module.exports = router;

