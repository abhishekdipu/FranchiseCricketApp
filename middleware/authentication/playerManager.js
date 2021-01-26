module.exports = (req, res, next) => {
  if (req.user.role !== "playerManager")
    return res.status(403).send("Access Denied");
  next();
};
