const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/LeaveController");

// Routes
router.post("/", LeaveController.createLeave);
router.get("/", LeaveController.getAllLeaves);

module.exports = router;
