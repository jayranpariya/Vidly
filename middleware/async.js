exports.asyncMiddleware = function (hendler) {
  return async (req, res, next) => {
    try {
      await hendler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
