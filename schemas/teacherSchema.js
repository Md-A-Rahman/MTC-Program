const mongoose = require('mongoose');

// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  session: { type: String, required: true },
});

// Create and export the Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;