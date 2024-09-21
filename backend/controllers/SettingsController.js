const CrudController = require("./CrudController");
const Settings = require("../models/Settings");

class SettingsController extends CrudController {
  constructor() {
    super(Settings);
  }
}

module.exports = new SettingsController();
