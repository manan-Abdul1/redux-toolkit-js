const bcrypt = require('bcrypt');
const userModel = require("../models/usersSchema");
const { createAuthorizationToken } = require("../utils/jwt")

const createNewUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the given email already exists
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newUser = new userModel({
            ...req.body,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching the users" });
    }
};
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Password is correct, user is authenticated
        res.status(200).json({ message: 'User authenticated', user: { email: user.email, id: user._id, username: user.username, token: createAuthorizationToken(user) } });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while signing in' });
    }
};
const updateUser = async (req, res) => {
    try {
        const { userId, username, email, imageUrl } = req.body;
        const user = await userModel.findOne({ _id: userId });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        await userModel.findOneAndUpdate({ _id: userId }, { email: email, username: username, imageUrl: imageUrl });

        const updatedUser = await userModel.findOne({ _id: userId }, { password: 0 });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating user' });
    }
};
module.exports = {
    createNewUser,
    getAllUsers,
    signInUser,
    updateUser
};
