require("express-async-errors"); // to handler express async errors
const logger = require("../config/logger");

module.exports = function () {
  //handeling node exception
  process.on("uncaughtException", (ex) => {
    logger.error(ex.message);
  });
  //handeling async node exception
  process.on("unhandledRejection", (ex) => {
    logger.error(ex.message);
  });
};
