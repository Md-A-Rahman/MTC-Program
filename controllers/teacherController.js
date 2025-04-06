const Teacher = require('../models/teacher');
const Student = require('../models/student');

// Teacher dashboard
exports.getDashboard = async (req, res) => {
  const students = await Student.find();
  res.render('teacher/dashboard', { students });
};

// Mark teacher attendance
exports.markAttendance = async (req, res) => {
  const { teacherId, date, status } = req.body;
  try {
    const teacher = await Teacher.findById(teacherId);
    teacher.attendance.push({ date, status });
    await teacher.save();
    res.redirect('/teacher/dashboard');
  } catch (error) {
    res.status(500).send('Error marking attendance');
  }
};

// Manage students
exports.addStudent = async (req, res) => {
  const { name, rollNumber, class: studentClass } = req.body;
  try {
    const student = new Student({ name, rollNumber, class: studentClass });
    await student.save();
    res.redirect('/teacher/dashboard');
  } catch (error) {
    res.status(500).send('Error adding student');
  }
};