const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const logger = require("../middleware/logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("connected to mongoose");
      console.log("connected to mongoose");
    })
    .catch((err) => logger.error("not connected mongoose error" + err));
};
