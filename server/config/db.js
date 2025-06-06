const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    // await mongoose.connection.dropDatabase(); // Optional: Clean DB during tests
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (err) {
    console.error('MongoDB disconnection error:', err.message);
  }
};


module.exports = { connectDB, disconnectDB };