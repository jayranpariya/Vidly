const logger = require("../middleware/logger");
require("express-async-errors");
module.exports = function () {
  process.on("uncaughtException", (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    logger.error(ex.message, ex);
    process.exit(1);
  });
};


// const p = Promise.reject(
//   new Error("somthing failed during startup unhandledRejection")
// );

// p.then(() => {
//   console.log("Done");
// });
