const CrudController = require("./CrudController");
const Settings = require("../models/Settings");

class SettingsController extends CrudController {
  constructor() {
    super(Settings);
  }

  getByYear = async (req, res) => {
    try {
      const setting = await this.model.find({ year: req.params.year });
      if (!setting) {
        return res.status(404).json({ message: "Setting Not Found" });
      }
      res.status(200).json(setting);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = new SettingsController();
