const { createLogger, transports, format } = require("winston");
require("winston-mongodb");
const config = require("config");

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    //for logging everything to file
    new transports.File({
      filename: "LogFiles/allLogs.log",
    }),
    //for logging error only to file
    new transports.File({
      filename: "LogFiles/errors.log",
      level: "error",
    }),

    //for logging error to mongoDB
    new transports.MongoDB({
      db: config.get("db"),
      collection: "ErrorLogs",
      level: "error",
      options: { useUnifiedTopology: true },
    }),
  ],
});

//in non prod env log everything to console also
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
