require("winston-mongodb");
const winston = require("winston");

exports.errorlog = () => {



  return winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: "error.log", level: "info" }),
      new winston.transports.File({ filename: "combined.log" }),
      new winston.transports.MongoDB({
        db: "mongodb://localhost:27017/vidly",
        level: "info",
        options: { useUnifiedTopology: true },
      }),
    ],
  });
};
