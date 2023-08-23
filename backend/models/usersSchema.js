const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: { 
     type: String, 
     required: true 
    },
    password: {
     type: String,
     required: true
    },
  });
const taskModel = mongoose.model('users', usersSchema);
module.exports = taskModel;