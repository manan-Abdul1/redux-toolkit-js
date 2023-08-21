const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")
const usersRoutes = require("./routes/usersRoutes")

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api',taskRoutes)
app.use('/user', usersRoutes)


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));