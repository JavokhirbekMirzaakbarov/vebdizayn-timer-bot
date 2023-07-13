const { connectToDatabase } = require("../db/connect");
const TimerModel = require("../db/model");

const getMonthIndex = (monthName) => {
  const date = new Date(`${monthName} 1, 2000`);

  if (isNaN(date)) {
    // Invalid month name
    return -1;
  }

  return date.getMonth();
};

const saveTime = async (month, day) => {
  try {
    await connectToDatabase();
    console.log("Connected to mongoDB!");
    const currentYear = new Date().getFullYear();
    const monthIndex = getMonthIndex(month);

    if (monthIndex === -1) {
      // Invalid month name
      return null;
    }

    const date = new Date(currentYear, monthIndex, day, 0, 0, 0);
    const instance = await TimerModel.findOne();

    await TimerModel.updateOne({ _id: instance._id }, { expireDate: date });
    return true;
  } catch (error) {
    console.log("Error connecting to DB:", error);
    return false;
  }
};

module.exports = saveTime;
