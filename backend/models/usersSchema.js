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
     required: false
    },
    imageUrl: {
      type: String,
      required:false
    },
    isGoogleAuth: {
      type: Boolean,
      required:true
    }
  });
const userModel = mongoose.model('users', usersSchema);
module.exports = userModel;