const mongoose = require("mongoose");
const Favorite = require("../model/Favorite");
const Course = require("../model/Course");
const User = require("../model/User");

/**
 * Get all favorites for the authenticated user
 * @param {Request} req - Request object with user id from auth middleware
 * @param {Response} res 
 * @returns favorite courses and tutors for the user
 */
const getFavorites = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const favorite = await Favorite.findOne({ studentId: req.user.id })
      .populate("favoriteCourses", "courseId title description department")
      .populate("favoriteTutors", "name email studentId major college");

    if (!favorite) {
      return [200, {
        favoriteCourses: [],
        favoriteTutors: [],
      }, null];
    }

    return [200, {
      favoriteCourses: favorite.favoriteCourses,
      favoriteTutors: favorite.favoriteTutors,
    }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Add a course to favorites
 * @param {Request} req - Request object with courseId in params and user id from auth middleware
 * @param {Response} res 
 * @returns updated favorite courses list
 */
const addFavoriteCourse = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const { courseId } = req.params;
    if (!courseId) {
      return [400, { "message": "Course ID is required." }, null];
    }

    const course = await Course.findOne({ courseId });
    if (!course) {
      return [204, { "message": "Course not found." }, null];
    }

    let favorite = await Favorite.findOne({ studentId: req.user.id });
    if (!favorite) {
      favorite = await Favorite.create({
        studentId: req.user.id,
        favoriteTutors: [],
        favoriteCourses: [],
      });
    }

    if (!favorite.favoriteCourses.includes(course._id)) {
      favorite.favoriteCourses.push(course._id);
      await favorite.save();
    }

    await favorite.populate("favoriteCourses", "courseId title description department");
    console.log("Course added to favorites");
    return [200, {
      message: "Course added to favorites",
      favoriteCourses: favorite.favoriteCourses,
    }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Remove a course from favorites
 * @param {Request} req - Request object with courseId in params and user id from auth middleware
 * @param {Response} res 
 * @returns updated favorite courses list
 */
const removeFavoriteCourse = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const { courseId } = req.params;
    if (!courseId) {
      return [400, { "message": "Course ID is required." }, null];
    }

    const course = await Course.findOne({ courseId });
    if (!course) {
      return [204, { "message": "Course not found." }, null];
    }

    const favorite = await Favorite.findOne({ studentId: req.user.id });
    if (!favorite) {
      return [204, { "message": "No favorites found." }, null];
    }

    favorite.favoriteCourses = favorite.favoriteCourses.filter(
      (id) => id.toString() !== course._id.toString()
    );
    await favorite.save();

    await favorite.populate("favoriteCourses", "courseId title description department");
    console.log("Course removed from favorites");
    return [200, {
      message: "Course removed from favorites",
      favoriteCourses: favorite.favoriteCourses,
    }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Add a tutor to favorites
 * @param {Request} req - Request object with studentId in params and user id from auth middleware
 * @param {Response} res 
 * @returns updated favorite tutors list
 */
const addFavoriteTutor = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const { studentId } = req.params;
    if (!studentId) {
      return [400, { "message": "Tutor student ID is required." }, null];
    }

    const tutor = await User.findOne({ studentId, role: "tutor" });
    if (!tutor) {
      return [204, { "message": "Tutor not found." }, null];
    }

    let favorite = await Favorite.findOne({ studentId: req.user.id });
    if (!favorite) {
      favorite = await Favorite.create({
        studentId: req.user.id,
        favoriteTutors: [],
        favoriteCourses: [],
      });
    }

    if (!favorite.favoriteTutors.includes(tutor._id)) {
      favorite.favoriteTutors.push(tutor._id);
      await favorite.save();
    }

    await favorite.populate("favoriteTutors", "name email studentId major college");
    console.log("Tutor added to favorites");
    return [200, {
      message: "Tutor added to favorites",
      favoriteTutors: favorite.favoriteTutors,
    }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Remove a tutor from favorites
 * @param {Request} req - Request object with studentId in params and user id from auth middleware
 * @param {Response} res 
 * @returns updated favorite tutors list
 */
const removeFavoriteTutor = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const { studentId } = req.params;
    if (!studentId) {
      return [400, { "message": "Tutor student ID is required." }, null];
    }

    const tutor = await User.findOne({ studentId, role: "tutor" });
    if (!tutor) {
      return [204, { "message": "Tutor not found." }, null];
    }

    const favorite = await Favorite.findOne({ studentId: req.user.id });
    if (!favorite) {
      return [204, { "message": "No favorites found." }, null];
    }

    favorite.favoriteTutors = favorite.favoriteTutors.filter(
      (id) => id.toString() !== tutor._id.toString()
    );
    await favorite.save();

    await favorite.populate("favoriteTutors", "name email studentId major college");
    console.log("Tutor removed from favorites");
    return [200, {
      message: "Tutor removed from favorites",
      favoriteTutors: favorite.favoriteTutors,
    }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

module.exports = {
  getFavorites,
  addFavoriteCourse,
  removeFavoriteCourse,
  addFavoriteTutor,
  removeFavoriteTutor
};
