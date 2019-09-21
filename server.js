const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({extended: false}))
app.get('/', (req, res)=> res.send('API running'))

// Define Routes
app.use('/api/users', require('./server/users/users.route'));
app.use('/api/auth', require('./server/auth/auth.route'));
app.use('/api/tasks', require('./server/tasks/tasks.route'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))