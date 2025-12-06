const mongoose = require("mongoose");
const User = require("../model/User");
const Announcement = require("../model/Announcement");
const Notification = require("../model/Notification");

/**
 * Create a new announcement and send notifications to all users
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function createAnnouncement(req, res) {
    try {
    if (!req?.body?.adminId || !req?.body?.title || !req?.body?.content || !req?.body?.courseId) {
        return [400, { "message": "adminId,courseId,title,content and courseId are required" }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.adminId)) {
        return [400, { "message": "admin id is not valid." }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
        return [400, { "message": "course id is not valid." }, null];}
        const new_announcement = await Announcement.create({
            adminId: req.body.adminId,
            title: req.body.title,
            content: req.body.content,
            targetLevel: req.body.targetLevel,
            courseId: req.body.courseId,
        });
        const allUsers = await User.find();
        await Promise.all(
        allUsers.map(user  =>
         Notification.create({
            userId: user._id,
            title: req.body.title,
            message: req.body.content,
            type: "announcement",
        })
        )
    );
        console.log("Announcement Created");
        return [201, new_announcement, null];
    } catch (err) {
        console.log(err);
        return [500, { "message": "Server error" }, null];
    }
};

/**
 * Get all announcements
 * @param {Request} req
 * @param {Response} res 
 * @returns
 */
async function readAnnouncement(req, res) {
    try {
         const allAnnouncement = await Announcement.find()
           .populate('courseId', 'courseId title')
           .populate('adminId', 'name')
           .sort({ createdAt: -1 });
         
         if (!allAnnouncement.length) {
           return [200, { "message": "No Announcements are found.", announcements: [] }, null];
         }
         
         console.log("Announcements are read");
         return [200, allAnnouncement, null];
      }
      catch (err) {
        console.log(err);
        return [500, { "message": "Server error" }, null];
    }
};
module.exports = { 
    readAnnouncement,createAnnouncement
 };