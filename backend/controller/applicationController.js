const Application = require("../model/Applications");

// View applications for Admin 
exports.getAllApplications = async (req, res) => {
  try {
    // Find only pending applications from MongoDB and populate related fields
    const applications = await Application.find({ status: "pending" })
      .populate("userId", "name email")  
      .populate("courseId", "courseId title department")      
      .sort({ createdAt: -1 });
    
    const result = applications.map(app => {
      const userId = app.userId || {};
      const courseId = app.courseId || {};
      
      return {
        id: app._id.toString(),
        studentName: userId.name || "Unknown Student",
        courseName: courseId.title || courseId.courseId || "Unknown Course",
        courseCode: courseId.courseId || "",
        department: courseId.department || "",
        grade: app.grade || "N/A",
        status: app.status || "pending",
        appliedAt: app.createdAt || app.updatedAt,
      };
    });

    // Return success response with applications array
    return res.status(200).json({ 
      success: true,
      applications: result || []
    });

  } catch (err) {
    console.error("Error fetching applications:", err);
    return res.status(500).json({ 
      success: false,
      message: "Server error while fetching applications",
      error: err.message,
      applications: []
    });
  }
};

// Approve or Reject application
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    // Validate that status is provided
    if (!status) {
      return res.status(400).json({ 
        success: false,
        message: "Status is required" 
      });
    }

    // Validate status value
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid status. Must be one of: pending, approved, rejected" 
      });
    }

    // Find application by ID from MongoDB
    const application = await Application.findById(id)
      .populate("userId", "name email")
      .populate("courseId", "courseId title");
      
    if (!application) {
      return res.status(404).json({ 
        success: false,
        message: "Application not found" 
      });
    }

    // Update status and save to MongoDB
    application.status = status;
    await application.save();

    // Prepare response with populated fields
    const userId = application.userId || {};
    const courseId = application.courseId || {};

    return res.status(200).json({ 
      success: true,
      message: "Application status updated successfully",
      application: {
        id: application._id.toString(),
        studentName: userId.name || "Unknown Student",
        courseName: courseId.title || courseId.courseId || "Unknown Course",
        courseCode: courseId.courseId || "",
        grade: application.grade || "N/A",
        status: application.status,
        appliedAt: application.createdAt,
      }
    });

  } catch (err) {
    console.error("Error updating application status:", err);
    
    // Handle invalid ObjectId format
    if (err.name === 'CastError' || err.kind === 'ObjectId') {
      return res.status(400).json({ 
        success: false,
        message: "Invalid application ID format" 
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: "Server error while updating application",
      error: err.message 
    });
  }
};
