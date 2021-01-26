require("dotenv").config(); //for env var setting
const express = require("express");
const logger = require("./config/logger");

const app = express();

require("./startup/loggingErrors")();
require("./startup/config")(); // to check jwtprivate key is set
require("./startup/db")(); //for db connection
require("./startup/routes")(app); //handeling routes
require("./startup/validation")(); // objectId validation

const port = process.env.PORT || 6000;
app.listen(port, () =>
  logger.info(`Listening on port: ${port} ; ENV: ${process.env.NODE_ENV}`)
);
