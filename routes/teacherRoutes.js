const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Render teacher login page
router.get('/', (req,res)=>{
    res.render('./teacher_views/teacherLogin')
})
router.get('/dashboard', teacherController.getDashboard);
router.post('/login', teacherController.handleLogin);
router.post('/attendance', teacherController.markAttendance);
router.post('/students', teacherController.addStudent);

// Render attendance page
router.get('/attendance', (req, res) => res.render('./teacher_views/attendance'));

// Render students page
router.get('/students', (req, res) => res.render('./teacher_views/students'));

// Other routes
router.get('/attendance/form', (req, res) => res.render('./teacher_views/teacherAttendance')); // Attendance form
router.post('/attendance/mark', teacherController.markAttendance); // Handle attendance submission
router.get('/attendance/check', teacherController.getAttendance); // Check attendance

router.get('/students/add', (req, res) => res.render('./teacher_views/addStudent')); // Add student form
router.post('/students/add', teacherController.addStudent); // Handle adding a student
router.get('/students/remove', (req, res) => res.render('./teacher_views/removeStudent')); // Remove student form
router.post('/students/remove', teacherController.removeStudent); // Handle removing a student

// Get all students
router.get('/students/all', teacherController.getAllStudents);

// Add student's monthly attendance
router.get('/students/addattendance', (req, res) => res.render('./teacher_views/updateStudentAttendance')); // Render form
router.post('/students/addattendance', teacherController.updateStudentAttendance); // Handle form submission

// Get students' monthly attendance
router.get('/students/monthly_attendance', teacherController.getStudentAttendance);
module.exports = router;