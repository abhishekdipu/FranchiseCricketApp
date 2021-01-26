const logger = require("../../config/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Someting went wrong");
};
