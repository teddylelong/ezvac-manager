class CrudController {
  constructor(model) {
    this.model = model;
  }

  // Create a new document
  create = async (req, res) => {
    try {
      const document = new this.model(req.body);
      await document.save();
      res.status(201).json(document);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Get a document by ID
  get = async (req, res) => {
    try {
      const document = await this.model.findById(req.params.id);
      if (!document) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} Not Found` });
      }
      res.status(200).json(document);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Update a document by ID
  update = async (req, res) => {
    try {
      const document = await this.model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!document) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} Not Found` });
      }
      res.status(200).json(document);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Delete a document by ID
  delete = async (req, res) => {
    try {
      const document = await this.model.findByIdAndDelete(req.params.id);
      if (!document) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} Not Found` });
      }
      res
        .status(200)
        .json({ message: `${this.model.modelName} deleted successfully` });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // Get all documents
  getAll = async (req, res) => {
    try {
      const documents = await this.model.find();
      res.status(200).json(documents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = CrudController;
