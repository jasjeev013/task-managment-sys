const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://task-managment-sys-backend.vercel.app',
  credentials: true // Optional: include this if you're using cookies or HTTP auth
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);


// Route files
const auth = require('./routes/auth.routes');
const users = require('./routes/user.routes');
const tasks = require('./routes/task.routes');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/tasks', tasks);

// Error handling middleware
app.use(errorHandler);

module.exports = app;