const CrudController = require("./CrudController");
const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

class EmployeeController extends CrudController {
  constructor() {
    super(Employee);
  }

  delete = async (req, res) => {
    try {
      const employee = await this.model.findById(req.params.id);
      if (!employee) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} Not Found` });
      }
      await Leave.deleteMany({ employee: employee._id });
      await this.model.findByIdAndDelete(req.params.id);

      res
        .status(200)
        .json({ message: `${this.model.modelName} deleted successfully` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

module.exports = new EmployeeController();
