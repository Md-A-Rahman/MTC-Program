const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  tutors: {type: Number, required: true },
});

const Center = mongoose.model('Center', centerSchema);
module.exports = Center;