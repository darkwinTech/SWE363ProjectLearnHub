const mongoose = require("mongoose");
const Course = require("../model/Course");

/**
 * Get all courses with optional filtering by department and search query
 * @param {Request} req - Request object with optional query params: department, search
 * @param {Response} res 
 * @returns all courses matching the filters
 */
const getAllCourses = async (req, res) => {
  try {
    const { department, search } = req.query;
    const query = {};

    // Helper function to escape regex special characters
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Filter by department (case-insensitive)
    let departmentFilter = null;
    if (department) {
      // Decode URL-encoded spaces and make case-insensitive
      const decodedDepartment = decodeURIComponent(department).trim();
      if (!decodedDepartment) {return [400, { "message": "Department cannot be empty." }, null];}
      const escapedDepartment = escapeRegex(decodedDepartment);
      departmentFilter = { department: { $regex: new RegExp(`^${escapedDepartment}$`, 'i') } };
    }

    // Search in title, description, and courseId (case-insensitive)
    let searchFilter = null;
    if (search) {const decodedSearch = decodeURIComponent(search).trim();
      if (!decodedSearch) {return [400, { "message": "Search query cannot be empty." }, null];
}
      const escapedSearch = escapeRegex(decodedSearch);
      searchFilter = {
        $or: [
          { title: { $regex: escapedSearch, $options: "i" } },
          { description: { $regex: escapedSearch, $options: "i" } },
          { courseId: { $regex: escapedSearch, $options: "i" } },
        ]
      };
    }

    // Combine filters with AND logic when both are provided
    if (departmentFilter && searchFilter) {
      query.$and = [departmentFilter, searchFilter];
    } else if (departmentFilter) {
      Object.assign(query, departmentFilter);
    } else if (searchFilter) {
      Object.assign(query, searchFilter);
    }

    const courses = await Course.find(query).sort({ courseId: 1 });
    if (!courses.length) {
      return [204, { "message": "No courses found." }, null];
    }
    return [200, courses, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Get a course by courseId
 * @param {Request} req - Request object with courseId in params
 * @param {Response} res 
 * @returns the course with the specified courseId
 */
const getCourseByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if (!courseId) {
      return [400, { "message": "Course ID is required." }, null];
    }

    const course = await Course.findOne({ courseId });

    if (!course) {
      return [204, { "message": "Course not found." }, null];
    }

    return [200, course, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Create a new course
 * @param {Request} req - Request object with courseId, title, description, department in body
 * @param {Response} res 
 * @returns the newly created course
 */
const createCourse = async (req, res) => {
  try {
    const { courseId, title, description, department } = req.body;

    if (!courseId || !title || !department) {
      return [400, { "message": "courseId, title, and department are required." }, null];
    }

    // Check if course with same courseId already exists
    const existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
      return [400, { "message": "Course with this courseId already exists." }, null];
    }

    const course = await Course.create({
      courseId,
      title,
      description: description || "",
      department,
    });

    console.log("Course Created");
    return [201, course, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Update an existing course
 * @param {Request} req - Request object with id in params and courseId, title, description, department in body
 * @param {Response} res 
 * @returns the updated course
 */
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId, title, description, department } = req.body;

    if (!id) {
      return [400, { "message": "Course ID is required." }, null];
    }

    const course = await Course.findOne({ courseId: id });
    if (!course) {
      return [204, { "message": "Course not found." }, null];
    }

    // Update courseId if provided and different
    if (courseId !== undefined) {
      if (courseId !== course.courseId) {
        const existingCourse = await Course.findOne({ courseId });
        if (existingCourse) {
          return [400, { "message": "Course with this courseId already exists." }, null];
        }
      }
      course.courseId = courseId;
    }
    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (department !== undefined) course.department = department;

    const result = await course.save();
    console.log("Course Updated");
    return [200, result, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Delete a course by courseId
 * @param {Request} req - Request object with id in params (courseId)
 * @param {Response} res 
 * @returns success message
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return [400, { "message": "Course ID is required." }, null];
    }

    const course = await Course.findOneAndDelete({ courseId: id });

    if (!course) {
      return [204, { "message": "Course not found." }, null];
    }

    console.log("Course Deleted");
    return [200, { "message": "Course deleted successfully." }, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

/**
 * Get all courses by department
 * @param {Request} req - Request object with department in params
 * @param {Response} res 
 * @returns all courses in the specified department
 */
const getCoursesByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    if (!department) {
      return [400, { "message": "Department is required." }, null];
    }

    const courses = await Course.find({ department }).sort({ courseId: 1 });

    if (!courses.length) {
      return [204, { "message": "No courses found for this department." }, null];
    }

    return [200, courses, null];
  } catch (err) {
    console.log(err);
    return [500, null, null];
  }
};

module.exports = {
  getAllCourses,
  getCourseByCourseId,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByDepartment
};
