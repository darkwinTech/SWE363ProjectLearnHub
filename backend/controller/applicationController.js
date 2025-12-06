const Application = require("../model/Applications");

// viwe application for Admin 
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId", "name")  
      .populate("courseId", "name")      
      .sort({ createdAt: -1 });
      
    const result = applications.map(app => ({
      id: app._id,
      studentName: app.userId.name,
      courseName: app.courseId.name,
      grade: app.grade,
      status: app.status,
      appliedAt: app.createdAt,
    }));

    return res.json({ applications : result });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Aprroved or Rejected
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    return res.json({ message: "Application updated", application });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
