const express = require("express");
const winston = require("winston");

const app = express();

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 6000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
