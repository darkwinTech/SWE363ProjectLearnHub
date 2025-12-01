const Support = require('../model/Support');
const Notification = require('../model/Notification');

// Student: create support ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Support.create({
      userId: req.user.id,
      issue: req.body.issue,
    });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Student: get my tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Support.find({ userId: req.user.id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Support.find().populate('userId', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: respond to ticket
exports.respondTicket = async (req, res) => {
  try {
    const { response, status } = req.body;

    const ticket = await Support.findByIdAndUpdate(
      req.params.id,
      {
        response,
        status: status || "in-progress",
        respondedBy: req.user.id,
      },
      { new: true }
    );

    // Send notification to user
    await Notification.create({
      userId: ticket.userId,
      title: "Support Ticket Updated",
      message: `Your ticket has a new response: "${response}"`,
      type: "support",
    });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};