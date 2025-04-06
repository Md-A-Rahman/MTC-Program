const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  attendance: [
    {
      month: String,
      daysPresent: Number,
      totalDays: Number,
    },
  ],
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;