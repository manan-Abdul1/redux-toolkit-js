const express = require('express');
const router = express.Router();

const { createNewTask, deleteTask, completedTask, editTask, getTasksByUserId } = require("../controllers/taskControllers");

//Routes
router.post('/createNewTask', createNewTask)
router.delete('/deleteTask', deleteTask)
router.put('/completedTask', completedTask)
router.put('/editTask', editTask)
router.get('/tasks', getTasksByUserId); 


module.exports = router;
