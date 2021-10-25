exports.isAdmini = (req, res, next) => {
  // 401 Unauthorized
  // 403 Forbidden

  if (req.user.isAdmini) return res.status(403).send("Access denied");
  next();
};
