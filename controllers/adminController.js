const Center = require('../models/center');
const Teacher = require('../models/teacher');

// Admin dashboard
exports.getDashboard = async (req, res) => {
  const centers = await Center.find();
  const teachers = await Teacher.find();
  res.render('admin/dashboard', { centers, teachers });
};

// Add a center
exports.addCenter = async (req, res) => {
  const { name, location } = req.body;
  try {
    const center = new Center({ name, location });
    await center.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error adding center');
  }
};

// Add a teacher
exports.addTeacher = async (req, res) => {
  const { name, session, username, password } = req.body;
  try {
    const teacher = new Teacher({ name, session, username, password });
    await teacher.save();
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(500).send('Error adding teacher');
  }
};

// Attendance overview
exports.getAttendanceOverview = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const teacherAttendance = await Teacher.find({ 'attendance.date': today });
  res.render('admin/attendanceOverview', { teacherAttendance });
};