const express = require('express');
const { createNewUser, getAllUsers, signInUser, updateUser } = require('../controllers/usersControllers');
const router = express.Router();


//Routes
router.post('/createNewUser', createNewUser)
router.get('/getAllUsers', getAllUsers)
router.post('/signIn', signInUser)
router.put("/updateUser", updateUser)


module.exports = router;
