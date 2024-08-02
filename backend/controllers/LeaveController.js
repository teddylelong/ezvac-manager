const CrudController = require("./CrudController");
const Leave = require("../models/Leave");

class LeaveController extends CrudController {
  constructor() {
    super(Leave);
  }
}

module.exports = new LeaveController();
