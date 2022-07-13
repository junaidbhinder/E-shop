module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const authorizationHeaders =
    req.headers["authorization"] || req.headers["Authorization"];
  const jwtToken = authorizationHeaders
    ? `${authorizationHeaders}`.split("Bearer ")[1]
    : "";
  if (!jwtToken) {
    return res.status(400).send("No Access Token Provided");
  }

  jwt.verify(jwtToken, process.env.TOKEN_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send("Invalid Token Send");
    } else {
      Object.assign(req, {
        _id: decoded._id,
      });
      next();
    }
  });
};
