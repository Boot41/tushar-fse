const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid : {
    type : String,
    required : true,
  },
  status: {
    type: String,
  },
  profileSummary : {
    type : String,
  },
  meetingLink : {
    type : String,
  },
  jd: {
    type: String,
    required: true,
  },
  atsScore: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
