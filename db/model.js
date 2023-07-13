const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  expireDate: {
    type: Date,
    required: true,
  },
});

const TimerModel =
  mongoose.models.Timer || mongoose.model("Timer", timerSchema);

module.exports = TimerModel;
