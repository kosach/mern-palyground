const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}));
app.get('/', (req, res)=> res.send('API running'));

// Define Routes
app.use('/api/users', require('./server/components/user/user.route'));
app.use('/api/users/auth', require('./server/components/user/auth.route'));
app.use('/api/tasks', require('./server/components/task/task.route'));
const PORT = process.env.PORT || 4000;

/* eslint-disable */
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
