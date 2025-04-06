const express =require('express');
const router = express.Router();



// Hardcoded admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};


  
  
  // Admin login render
  router.get('/', (req, res) => {
      res.render('adminLogin'); // Render the admin login page
    });
  
  // Admin login route
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === adminCredentials.username && password === adminCredentials.password) {
      return res.redirect('/admin/dashboard'); // Redirect to the dashboard on success
    }
    return res.status(401).send('Invalid credentials');
});


// route to admin dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard page
  });

  router.get('/centers', (req, res) => {
    return res.status(200).json({ message: 'center details feature coming soon' });
  });
  
  router.get('/teachers', (req, res) => {
    return res.status(200).json({ message: 'teacher details feature coming soon' });
  });
  
  router.get('/reports', (req, res) => {
    return res.status(200).json({ message: 'Report generation feature coming soon' });
  });

  module.exports = router;