const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Classroom Schema
const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type:String,
    required:true
  },
  courseCode: {
      type:String
  },
  meetingLink: {
    type: String
  },
  inviteCode: {
    type: String,
    required: true
  },
  members: [Object],
  stream: [Object]
});
module.exports = Classroom = mongoose.model("classrooms", ClassroomSchema);