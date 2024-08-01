const mongoose = require("mongoose");

const dbURI = "mongodb://db:27017/ezvac-manager";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
