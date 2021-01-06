const jwtService = require("../services/jwtService");

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Auth failed" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwtService.verifyToken(token)
    if (!decode || decode.exp > Date.now()) {
      return res.status(401).send({ message: "Expired Token." });
    }
  } catch (ex) {
    return res.status(403).send({ message: "Forbidden: Invalid Token..." });
  }
  next();
};
