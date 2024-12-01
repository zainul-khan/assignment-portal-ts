import mongoose from 'mongoose';

// Connect to MongoDB
async function connectToDatabase() {
  const MONGO_URI = process.env.MONGO_URI;
  
  if (!MONGO_URI) {
    console.error("MongoDB URI is missing!");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectToDatabase;
