const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getDashboard);
router.post('/centers', adminController.addCenter);
router.post('/teachers', adminController.addTeacher);
router.get('/attendance-overview', adminController.getAttendanceOverview);

module.exports = router;