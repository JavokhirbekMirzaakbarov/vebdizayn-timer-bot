const { connectToDatabase } = require("../db/connect");
const TimerModel = require("../db/model");

const saveTime = async (month, day) => {
  try {
    await connectToDatabase();
    console.log("Connected to mongoDB!");
    const year = new Date().getFullYear();

    const date = new Date(`${month} ${day}, ${year}`);
    const instance = await TimerModel.findOne();

    await TimerModel.updateOne({ _id: instance._id }, { expireDate: date });
  } catch (error) {
    console.log("Error connecting to DB:", error);
  }
};

module.exports = saveTime;
