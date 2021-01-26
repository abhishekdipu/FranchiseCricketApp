const mongoose = require("mongoose");
const config = require("config");
const logger = require("../config/logger");

module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => logger.info("connected to mongodb..."));
};
