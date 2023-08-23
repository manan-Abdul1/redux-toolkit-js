const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoListSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: { 
     type: String, 
     required: true 
    },
    completed: {
     type: Boolean,
     default: false
    },
  });
const taskModel = mongoose.model('todoList', todoListSchema);
module.exports = taskModel;