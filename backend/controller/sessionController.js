const mongoose= require("mongoose");
const Session = require("../model/Sessions");
const Tutor = require("../model/TutorProfile");


/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function createSession(req, res){
    try {
    if (!req?.body?.courseId || !req?.body?.tutorId || !req?.body?.title || !req?.body?.dateTime || !req.body.teamsLink) {
        return [400, { "message": "tutorId,courseId,title,dateTime and teamsLink are required" }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
        return [400, { "message": "Course id is not valid." }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.tutorId)) {
        return [400, { "message": "tutor id is not valid." }, null];}
        const new_session = await Session.create({
            courseId: req.body.courseId,
            tutorId: req.body.tutorId,
            tutorName:req.body.tutorName,
            description: req.body.description,
            title: req.body.title,
            dateTime: req.body.dateTime,
            teamsLink: req.body.teamsLink,
            status: req.body.status,
        });
        const touter = await Tutor.findById(req.body.tutorId);
        touter.coursesTaught.push(req.body.courseId);
        await touter.save();
        console.log("Session Created ");
        return [201,new_session, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
async function readSession() {
    try{
         const allSession = await Session.find();
         if (!allSession.length) 
            {return [200, { "message": "No Sessions are found." }, null];}
         return [200, allSession, null];
      }
      catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function updateSession(req, res){
    try {
     if (!req?.body?._id){
      return [400, { message: "Session _id is required" }, null];
     }
    if (!req?.body?.courseId || !req?.body?.tutorId || !req?.body?.title || !req?.body?.dateTime || !req.body.teamsLink||!req?.body?.tutorName) {
        return [400, { "message": "tutorId,courseId,title,dateTime and teamsLink are required" }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.courseId)) {
        return [400, { "message": "Course id is not valid." }, null];}
    if (!mongoose.Types.ObjectId.isValid(req.body.tutorId)) {
        return [400, { "message": "tutor id is not valid." }, null];}
            const session = await Session.findById(req.body._id);
            if(session.tutorId.toString()!=req.body.tutorId){
                const touterOld = await Tutor.findById(session.tutorId);
                touterOld.coursesTaught = touterOld.coursesTaught.filter(id => id.toString() !== req.body.courseId);
                await touterOld.save();
                const touterNew = await Tutor.findById(req.body.tutorId);
                touterNew.coursesTaught.push(req.body.courseId);
                await touterNew.save();
            }
            session.courseId=req.body.courseId;
            session.tutorId=req.body.tutorId
            session.tutorName=req.body.tutorName;
            session.title=req.body.title;
            session.description=req.body.description;
            session.dateTime=req.body.dateTime;
            session.teamsLink=req.body.teamsLink;
            session.status=req.body.status;
        await session.save();
        console.log("Session updated");
        return [201,session, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
/**
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */
async function deleteSession(req, res){
    try {
    if (!mongoose.Types.ObjectId.isValid(req.body._id) ){
        return [400, { "message": " session is not valid." }, null];}
        const session = await Session.findById(req.body._id);
        if (!session){
             return [200, { "message": "No matched session found." }, null];}
        const tutorId = session.tutorId;
        const courseId = session.courseId;
        const deleted_session= await session.deleteOne();
        const tutor = await Tutor.findById(tutorId);
        if(tutor){
        tutor.coursesTaught = tutor.coursesTaught.filter(id => id.toString() !== courseId);
        const related_tutor = await tutor.save();
        }
        console.log("Session Deleted");
        return [200,{ deleted_session}, null];
    } catch (err) {
        console.log(err);
        return [500, null, null];
    }
};
module.exports = { 
    deleteSession,updateSession,readSession,createSession
 };
