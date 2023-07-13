const mongoose = require("mongoose");

const env = process.env;

const uri = env.MONGO_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(`${uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

module.exports = { connectToDatabase };
