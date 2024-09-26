const express = require("express");
const router = express.Router();
const controller = require("../controllers/SettingsController");

// Routes
router.post("/", controller.create);
router.get("/:id", controller.get);
router.get("/year/:year", controller.getByYear);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.getAll);

module.exports = router;
