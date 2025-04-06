const express = require('express');
const router = express.Router();

// Hardcoded teacher credentials
const teacherCredentials = {
  username: 'teacher',
  password: 'teacher123',
};

// Teacher login render
router.get('/', (req,res) => {
    res.render('teacherLogin');
})

router.post('/login', (req,res) => {
    const {username, password} = req.body;
    if(username === teacherCredentials.username && password === teacherCredentials.password){
        return res.redirect('/teacher/dashboard'); // Redirect to the dashboard on success
    }
})

router.get('/dashboard', (req,res) => {
    res.render('teacherDashboard'); // Render the dashboard page
})
router.get('/students',(req,res) =>{
    return res.status(200).json({message: 'Students data feature coming soon'})
})

router.get('/attendance',(req,res) => {
    return res.status(200).json({message:'Attendance feature coming soon'})
})

router.get('/reports', (req,res) => {
    return res.status(200).json({message: 'reports feature coming soon'})
})

module.exports = router;