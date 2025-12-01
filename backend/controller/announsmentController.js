const mongoose= require("mongoose");
const User = require("../models/User");
const Announcement = require("../models/Announcement");
const Notification = require("../models/Notification");



/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function createAnnouncement(req, res){
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
        console.log("Announcement Created ");
        return [201, { new_announcement, touter }, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};

async function readAnnouncement() {
    try{
         const allAnnouncement = await Announcement.find();
         if (!allAnnouncement.length) 
            {return [204, { "message": "No Announcement are found." }, null];}
         console.log("Announcements are read");
         return [200, allAnnouncement, null];
      }
      catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
module.exports = { 
    readAnnouncement,createAnnouncement
 };