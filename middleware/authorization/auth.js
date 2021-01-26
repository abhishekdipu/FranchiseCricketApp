const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied, No Token Provided");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};
