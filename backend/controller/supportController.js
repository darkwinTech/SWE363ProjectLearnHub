const Support = require('../model/Support');
const Notification = require('../model/Notification');
const mongoose = require('mongoose');

/**
 * Student: Create a support ticket
 * @param {Request} req
 * @param {Response} res 
 * @returns
 */
const createTicket = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }
    if (!req.body.issue || !req.body.issue.trim()) {
      return [400, { "message": "Issue is required." }, null];
    }

    const ticket = await Support.create({
      userId: req.user.id,
      issue: req.body.issue,
    });

    console.log("Support ticket created");
    return [201, ticket, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

/**
 * Student: Get my support tickets
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
const getMyTickets = async (req, res) => {
  try {
    if (!req?.user?.id) {
      return [400, { "message": "User ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return [400, { "message": "User ID is not valid." }, null];
    }

    const tickets = await Support.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    return [200, tickets, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

/**
 * Admin: Get all support tickets
 * @param {Request} req
 * @param {Response} res 
 * @returns 
 */
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Support.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    return [200, tickets, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

/**
 * Admin: Respond to a support ticket
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
const respondTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { response, status } = req.body;

    if (!id) {
      return [400, { "message": "Ticket ID is required." }, null];
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return [400, { "message": "Ticket ID is not valid." }, null];
    }
    if (!response || !response.trim()) {
      return [400, { "message": "Response is required." }, null];
    }

    const ticket = await Support.findByIdAndUpdate(
      id,
      {
        response,
        status: status || "in-progress",
        respondedBy: req.user.id,
      },
      { new: true }
    );

    if (!ticket) {
      return [404, { "message": "Ticket not found." }, null];
    }

    // Send notification to user
    await Notification.create({
      userId: ticket.userId,
      title: "Support Ticket Updated",
      message: `Your ticket has a new response: "${response}"`,
      type: "support",
    });

    console.log("Support ticket responded to");
    return [200, ticket, null];
  } catch (err) {
    console.error(err);
    return [500, { "message": "Server error" }, null];
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getAllTickets,
  respondTicket
};