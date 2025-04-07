const Teacher = require('../models/teacher');
const Student = require('../models/student');
const bcrypt = require('bcrypt'); // Import bcrypt for password handling

// Render teacher dashboard
exports.getDashboard = async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students for the dashboard
        res.render('./teacher_views/teacherDashboard', { students });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Error loading dashboard');
    }
};

// Handle teacher login
exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ username });

        if (!teacher) {
            return res.status(401).send('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        res.redirect('/teacher/dashboard');
    } catch (error) {
        console.error('Error during teacher login:', error);
        res.status(500).send('Internal server error');
    }
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
        console.error('Error marking attendance:', error);
        res.status(500).send('Error marking attendance');
    }
};

// Get teacher attendance
exports.getAttendance = async (req, res) => {
  const { teacherId } = req.query;

  try {
      // Check if teacherId is provided
      if (!teacherId) {
          return res.status(400).send('Teacher ID is required');
      }

      // Fetch teacher from the database
      const teacher = await Teacher.findById(teacherId);

      // Check if teacher exists
      if (!teacher) {
          return res.status(404).send('Teacher not found');
      }

      // Render attendance records
      res.render('./teacher_views/checkAttendance', { attendance: teacher.attendance });
  } catch (error) {
      console.error('Error fetching attendance:', error);
      res.status(500).send('Error fetching attendance');
  }
};

// Add a student
exports.addStudent = async (req, res) => {
    const { name, rollNumber, class: studentClass } = req.body;

    try {
        const student = new Student({ name, rollNumber, class: studentClass });
        await student.save();
        res.redirect('/teacher/students');
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send('Error adding student');
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('./teacher_views/getAllStudents', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
};

// Remove a student
exports.removeStudent = async (req, res) => {
    const { studentId } = req.body;

    try {
        await Student.findByIdAndDelete(studentId);
        res.redirect('/teacher/students');
    } catch (error) {
        console.error('Error removing student:', error);
        res.status(500).send('Error removing student');
    }
};

// Update student's monthly attendance
exports.updateStudentAttendance = async (req, res) => {
    const { studentId, month, daysPresent } = req.body;

    try {
        const student = await Student.findById(studentId);

        if (!student.attendance) {
            student.attendance = {};
        }

        student.attendance[month] = daysPresent; // Update attendance for the given month
        await student.save();
        res.redirect('/teacher/students');
    } catch (error) {
        console.error('Error updating student attendance:', error);
        res.status(500).send('Error updating student attendance');
    }
};

// Get students' monthly attendance
exports.getStudentAttendance = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('./teacher_views/getStudentAttendance', { students });
    } catch (error) {
        console.error('Error fetching student attendance:', error);
        res.status(500).send('Error fetching student attendance');
    }
};