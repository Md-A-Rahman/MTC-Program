const Center = require('../models/center');
const Teacher = require('../models/teacher');

// Render admin login page
exports.renderLoginPage = (req, res) => {
  res.render('./admin_views/adminLogin'); // Render the admin login page
};

// Hardcoded admin credentials (for now)
const adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };
  
  // Handle admin login
  exports.handleLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Validate credentials
    if (username === adminCredentials.username && password === adminCredentials.password) {
      return res.redirect('/admin/dashboard'); // Redirect to the dashboard on success
    }
  
    // Invalid credentials
    res.status(401).send('Invalid username or password');
  };

// Admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const centers = await Center.find();
    const teachers = await Teacher.find();
    res.render('./admin_views/dashboard', { centers, teachers });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
};

exports.getCenters = async (req, res) => {
    try {
      const centers = await Center.find(); // Fetch centers from the database
      console.log('Centers:', centers); // Log the centers data
      res.render('./admin_views/centers', { centers }); // Pass the fetched data to the EJS template
    } catch (error) {
      console.error('Error fetching centers:', error); // Log the error
      res.status(500).send('Error loading centers');
    }
  };
  
  // Render Teachers Page
exports.getTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.render('./admin_views/teachers', { teachers });
    } catch (error) {
      res.status(500).send('Error loading teachers');
    }
  };

// Render Add Center Form
exports.renderAddCenterForm = (req, res) => {
  res.render('./admin_views/addCenter'); // Render the Add Center form
};

// Add a center
exports.addCenter = async (req, res) => {
  const { name, location, tutors } = req.body;
  try {
    const center = new Center({ name, location, tutors });
    await center.save();
    res.redirect('/admin/centers'); // Redirect to the dashboard after adding the center
  } catch (error) {
    res.status(500).send('Error adding center');
  }
};

// Render Add Teacher Form
exports.renderAddTeacherForm = (req, res) => {
  res.render('./admin_views/addTeacher'); // Render the Add Teacher form
};

// Add a teacher
exports.addTeacher = async (req, res) => {
  const { name, session, username, password } = req.body;
  try {
    const teacher = new Teacher({ name, session, username, password });
    await teacher.save();
    res.redirect('/admin/teachers'); // Redirect to the dashboard after adding the teacher
  } catch (error) {
    res.status(500).send('Error adding teacher');
  }
};

// Attendance overview
exports.getAttendanceOverview = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const teacherAttendance = await Teacher.find({ 'attendance.date': today });
    res.render('./admin_views/attendanceOverview', { teacherAttendance });
  } catch (error) {
    res.status(500).send('Error fetching attendance overview');
  }
};

// Reports
exports.getReports = (req, res) => {
  res.render('./admin_views/reports'); // Render the reports page
};