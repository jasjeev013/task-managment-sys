const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
require('dotenv').config();
const {connectDB} = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors({
  origin: 'https://task-managment-sys.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


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

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;