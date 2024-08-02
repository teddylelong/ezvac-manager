const express = require("express");
const router = express.Router();
const controller = require("../controllers/LeaveController");
const Employee = require("../models/Employee");
const checkExists = require("../middlewares/checkExists");

// Routes
router.post("/", checkExists(Employee, "employee"), controller.create);
router.get("/:id", controller.get);
router.put("/:id", checkExists(Employee, "employee"), controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.getAll);

module.exports = router;
