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
  console.log('Session:', req.session); // Debugging session

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

      req.session.teacherId = teacher._id; // Store teacherId in session

      res.redirect('/teacher/dashboard');
  } catch (error) {
      console.error('Error during teacher login:', error);
      res.status(500).send('Internal server error');
  }
};

// Mark teacher attendance
exports.markAttendance = async (req, res) => {
    const teacherId = req.session.teacherId; // Get teacherId from session

    try {
        if (!teacherId) {
            return res.status(401).send('Unauthorized: Please log in');
        }

        const { date, status } = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        teacher.attendance.push({ date, status });
        await teacher.save();

        res.redirect('/teacher/dashboard');
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).send('Error marking attendance');
    }
};

// Render attendance form
exports.renderAttendanceForm = async (req, res) => {
    const teacherId = req.session.teacherId; // Get teacherId from session

    try {
        if (!teacherId) {
            return res.status(401).send('Unauthorized: Please log in');
        }

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        res.render('./teacher_views/teacherAttendance', { teacher });
    } catch (error) {
        console.error('Error rendering attendance form:', error);
        res.status(500).send('Error loading attendance form');
    }
};

// Get teacher attendance
exports.getAttendance = async (req, res) => {
    const teacherId = req.session.teacherId; // Get teacherId from session

    try {
        if (!teacherId) {
            return res.status(401).send('Unauthorized: Please log in');
        }

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

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
  const { rollNumber } = req.body; // Get the student's roll number from the form

  try {
      const student = await Student.findOneAndDelete({ rollNumber }); // Find and delete the student by roll number

      if (!student) {
          return res.status(404).send('Student not found');
      }

      res.redirect('/teacher/students'); // Redirect to the students page after removal
  } catch (error) {
      console.error('Error removing student:', error);
      res.status(500).send('Error removing student');
  }
};

// Update student's monthly attendance
exports.updateStudentAttendance = async (req, res) => {
  const { rollNumber, month, daysPresent } = req.body; // Get roll number, month, and days present from the form

  try {
      const student = await Student.findOne({ rollNumber }); // Find the student by roll number

      if (!student) {
          return res.status(404).send('Student not found');
      }

      // Initialize attendance object if it doesn't exist
      if (!student.attendance) {
          student.attendance = {};
      }

      // Update attendance for the given month
      student.attendance[month] = daysPresent;
      await student.save();

      res.redirect('/teacher/students'); // Redirect to the students page after updating attendance
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

// Logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/'); // Redirect to login page
    });
};