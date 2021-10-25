const config = require("config");
const logger = require("../middleware/logger");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    // throw new Error("FATAL ERROR : jwtPrivetKey is not defined");
    logger.error("FATAL ERROR : jwtPrivetKey is not defined");
    // process.exit(1);
  }
};

// console.log(config.get("jwtPrivateKey"));
