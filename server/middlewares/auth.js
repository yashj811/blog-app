const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(403).send("Access Denied.");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIV_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send("Invaid Token.");
    }
  }
}

module.exports = auth;
