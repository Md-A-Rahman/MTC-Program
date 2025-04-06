require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./users/admin');
const teacherRoutes = require('./users/teacher')
const app = express();
const PORT = 3000;


// Setting EJS  as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Set the directory for EJS templates

// Middleware to parse JSON
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({extended:true})); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


// Mongoose schemas and models
const centerSchema = new mongoose.Schema({
    name: String,
    location: String,
  });
  const teacherSchema = new mongoose.Schema({
    name: String,
    session: String,
  });
  const Center = mongoose.model('Center', centerSchema);
  const Teacher = mongoose.model('Teacher', teacherSchema);

  app.get('/', (req,res) => {
    res.render('home'); // Render the home page
  })
  
// Use admin and teacher routes
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);


//*******************************************************************************************/
    //   const { username, password } = req.body;
//   if (username === adminCredentials.username && password === adminCredentials.password) {
//     return res.status(200).json({ message: 'Login successful' });
//   }
//   return res.status(401).json({ message: 'Invalid credentials' });
//********************************************************************************************/


// Route to create a center
//app.post('/admin/centers', async (req, res) => {
//*******************************************************************************************/
//   const { name, location } = req.body;
//   if (!name || !location) {
//     return res.status(400).json({ message: 'Name and location are required' });
//  }

//   try {
//     const center = new Center({ name, location });
//     await center.save();
//     return res.status(201).json({ message: 'Center created', center });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error creating center', error });
//   }
//*******************************************************************************************/

//});

// Route to add a teacher
//app.post('/admin/teachers', async (req, res) => {
//*******************************************************************************************/
    //  const { name, subject } = req.body;
//   if (!name || !subject) {
//     return res.status(400).json({ message: 'Name and subject are required' });
//   }
//   try {
//     const teacher = new Teacher({ name, subject });
//     await teacher.save();
//     return res.status(201).json({ message: 'Teacher added', teacher });
//   } catch (error) {
//     return res.status(500).json({ message: 'Error adding teacher', error });
//   }
//*******************************************************************************************/

//});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});