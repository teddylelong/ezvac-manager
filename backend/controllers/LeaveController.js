const CrudController = require("./CrudController");
const Leave = require("../models/Leave");

class LeaveController extends CrudController {
  constructor() {
    super(Leave);
  }

  // Override the getAll method to use populate
  getAll = async (req, res) => {
    try {
      const leaves = await Leave.find().populate("employee");
      res.status(200).json(leaves);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = new LeaveController();
