const express = require('express');
const connectDB = require('./database/connect');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Activity = require('./models/Activity');
const LineUser = require('./models/LineUser');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

// Routes
const activityRouter = require('./routes/activity');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const logoutRouter = require('./routes/logout');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Use Routes
app.get('/', (req, res) => {
    res.json('test ok');
});
app.use('/activities', activityRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);


//connect to db
const port = process.env.PORT || 3002
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:%d`, port);
        });
    } catch (err) {
        console.log(err);
    }
};

start();

