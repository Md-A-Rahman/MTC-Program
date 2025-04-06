const mongoose = require('mongoose')

const centerSchema = new mongoose.Schema({
    name: String,
    location: String
});

module.exports = centerSchema