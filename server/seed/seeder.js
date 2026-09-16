const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Algorithm = require('../models/Algorithm');
const seedAlgorithms = require('./seedData');

dotenv.config({ path: __dirname + '/../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/algoflix';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ Seeder connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Algorithm.deleteMany();
    await Algorithm.insertMany(seedAlgorithms);
    console.log(`🎉 Successfully seeded ${seedAlgorithms.length} algorithms into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error importing seed data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Algorithm.deleteMany();
    console.log('🗑️  All algorithm data deleted from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
