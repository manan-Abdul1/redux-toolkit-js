const mongoose = require("mongoose");

const connectDB = () => {
    const mongoURL = process.env.DB_URL;

    mongoose.connect(mongoURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log("MongoDB Connection Success");
    });

    connection.on('error', () => {
        console.log('MongoDB Connection Failed');
    });
};

module.exports = connectDB;