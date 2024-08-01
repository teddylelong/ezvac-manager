const Leave = require("../models/Leave");

exports.createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee");
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
