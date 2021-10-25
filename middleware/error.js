const winston = require("winston");

const logger = require("./logger");

exports.error = function (err, req, res, next) {
  logger.error(err.message, err);

  // log the exception
  res.status(500).send("something failed.");
};
