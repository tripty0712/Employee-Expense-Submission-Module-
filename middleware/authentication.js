const { verify } = require("../utils/auth.js");

async function authenticateUser(req, res, next) {
  const jwtString = req.cookies.jwt;

  if (!jwtString) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  const empId = await verify(jwtString);

  if (!empId) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  req.empId = empId;
  next();
}

module.exports = {
  authenticateUser,
};
