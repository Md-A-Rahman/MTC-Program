require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const teacherRoutes = require('./routes/teacherRoutes')
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', './views'); // Set the directory for EJS templates

app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({extended:true}));  // Middleware to parse URL-encoded data

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

  app.get('/', (req,res) => {
    res.render('home'); // Render the home page
  })
  
// Use admin and teacher routes
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});