const CrudController = require("./CrudController");
const Employee = require("../models/Employee");

class EmployeeController extends CrudController {
  constructor() {
    super(Employee);
  }
}

module.exports = new EmployeeController();
