const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Render admin login page
router.get('/', adminController.renderLoginPage);

// Admin dashboard
router.get('/dashboard', adminController.getDashboard);

// Handle admin login form submission
router.post('/login', adminController.handleLogin);

// Centers page
router.get('/centers', adminController.getCenters);

// Teachers page
router.get('/teachers', adminController.getTeachers);

// Add center
router.get('/addcenters', adminController.renderAddCenterForm);
router.post('/addcenters', adminController.addCenter);

// Add teacher
router.get('/addteachers', adminController.renderAddTeacherForm);
router.post('/addteachers', adminController.addTeacher);

// Attendance overview
router.get('/attendance-overview', adminController.getAttendanceOverview);

// Reports
router.get('/reports', adminController.getReports);

module.exports = router;