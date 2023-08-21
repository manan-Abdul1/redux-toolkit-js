const express = require('express');
const { createNewUser, getAllUsers, signInUser } = require('../controllers/usersControllers');
const router = express.Router();


//Routes
router.post('/createNewUser', createNewUser)
router.get('/getAllUsers', getAllUsers)
router.post('/signIn', signInUser)


module.exports = router;
