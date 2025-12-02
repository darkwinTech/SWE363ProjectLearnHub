const Favorite = require("../model/Favorite");
const Course = require("../model/Course");
const User = require("../model/User");

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ studentId: userId })
      .populate("favoriteCourses", "courseId title description department")
      .populate("favoriteTutors", "name email studentId major college");

    if (!favorite) {
      return res.json({
        favoriteCourses: [],
        favoriteTutors: [],
      });
    }

    return res.json({
      favoriteCourses: favorite.favoriteCourses,
      favoriteTutors: favorite.favoriteTutors,
    });
  } catch (err) {
    console.error("getFavorites error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addFavoriteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let favorite = await Favorite.findOne({ studentId: userId });
    if (!favorite) {
      favorite = new Favorite({
        studentId: userId,
        favoriteTutors: [],
        favoriteCourses: [],
      });
    }

    if (!favorite.favoriteCourses.includes(course._id)) {
      favorite.favoriteCourses.push(course._id);
      await favorite.save();
    }

    await favorite.populate("favoriteCourses", "courseId title description department");
    return res.json({
      message: "Course added to favorites",
      favoriteCourses: favorite.favoriteCourses,
    });
  } catch (err) {
    console.error("addFavoriteCourse error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeFavoriteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const favorite = await Favorite.findOne({ studentId: userId });
    if (!favorite) {
      return res.status(404).json({ message: "No favorites found" });
    }

    favorite.favoriteCourses = favorite.favoriteCourses.filter(
      (id) => id.toString() !== course._id.toString()
    );
    await favorite.save();

    await favorite.populate("favoriteCourses", "courseId title description department");
    return res.json({
      message: "Course removed from favorites",
      favoriteCourses: favorite.favoriteCourses,
    });
  } catch (err) {
    console.error("removeFavoriteCourse error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addFavoriteTutor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;

    const tutor = await User.findOne({ studentId, role: "tutor" });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    let favorite = await Favorite.findOne({ studentId: userId });
    if (!favorite) {
      favorite = new Favorite({
        studentId: userId,
        favoriteTutors: [],
        favoriteCourses: [],
      });
    }

    if (!favorite.favoriteTutors.includes(tutor._id)) {
      favorite.favoriteTutors.push(tutor._id);
      await favorite.save();
    }

    await favorite.populate("favoriteTutors", "name email studentId major college");
    return res.json({
      message: "Tutor added to favorites",
      favoriteTutors: favorite.favoriteTutors,
    });
  } catch (err) {
    console.error("addFavoriteTutor error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeFavoriteTutor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { studentId } = req.params;

    const tutor = await User.findOne({ studentId, role: "tutor" });
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    const favorite = await Favorite.findOne({ studentId: userId });
    if (!favorite) {
      return res.status(404).json({ message: "No favorites found" });
    }

    favorite.favoriteTutors = favorite.favoriteTutors.filter(
      (id) => id.toString() !== tutor._id.toString()
    );
    await favorite.save();

    await favorite.populate("favoriteTutors", "name email studentId major college");
    return res.json({
      message: "Tutor removed from favorites",
      favoriteTutors: favorite.favoriteTutors,
    });
  } catch (err) {
    console.error("removeFavoriteTutor error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
