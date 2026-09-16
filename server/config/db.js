const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/algoflix', {
      serverSelectionTimeoutMS: 3000, // Fail fast if MongoDB is not running locally
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️  MongoDB connection warning: ${error.message}`);
    console.log('ℹ️  AlgoFlix server is running with built-in in-memory dataset fallback mode.');
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
