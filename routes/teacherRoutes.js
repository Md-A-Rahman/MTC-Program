const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/dashboard', teacherController.getDashboard);
router.post('/attendance', teacherController.markAttendance);
router.post('/students', teacherController.addStudent);

module.exports = router;