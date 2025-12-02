const Application = require('../model/Applications');

// Create a new application 
exports.applyForCourse = async (req, res) => { 
  try {
    const { courseId, grade } = req.body;
    const userId = req.user.id; 

    if (!courseId || !grade) { 
      return res.status(400).json({ message: 'courseId and grade are required' }); 
    } 

    const existing = await Application.findOne({ userId, courseId }); 
    if (existing) {
      return res.status(409).json({ message: 'You already applied for this course' });
    }

    const application = new Application({ userId, courseId, grade });
    await application.save();

    return res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// get applications by current user
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ userId })
      .populate('courseId', 'name description')
      .sort({ createdAt: -1 });

    return res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// all pending applications in admin view
exports.getPendingApplications = async (req, res) => {
  try {
    const applications = await Application.find({ status: 'pending' })
      .populate('userId', 'name email')
      .populate('courseId', 'name description')
      .sort({ createdAt: -1 });

    return res.json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Approve an application by admin only
exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'approved';
    await application.save();

    return res.json({ message: 'Application approved', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Reject an application by admin only
exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = 'rejected';
    await application.save();

    return res.json({ message: 'Application rejected', application });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
