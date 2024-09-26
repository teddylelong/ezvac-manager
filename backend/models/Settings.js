const mongoose = require("mongoose");

const DateIntervalSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const SettingsSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, unique: true },
    excludedDates: [{ type: Date }],
    excludedDateIntervals: [DateIntervalSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", SettingsSchema);
