const mongoose = require("mongoose");

const checkExists = (model, field) => {
  return async (req, res, next) => {
    try {
      const id = req.body[field];
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ error: `${model.modelName} ID is invalid` });
      }
      const document = await model.findById(id);
      if (!document) {
        return res.status(404).json({ error: `${model.modelName} Not Found` });
      }
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

module.exports = checkExists;
