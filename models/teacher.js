const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  session: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  attendance: [
    {
      date: String,
      status: String,
    },
  ],
});

// Hash the password before saving
teacherSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;