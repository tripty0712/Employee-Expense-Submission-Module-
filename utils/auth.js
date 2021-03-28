const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
const jwtOptions = { algorithm: "HS256", expiresIn: "30d" };

function sign(empId) {
 
  return jwt.sign({ empId }, jwtSecret, jwtOptions);
}

async function verify(jwtString) {
  // use jwt module to verify jwtString
  const { empId } = await jwt.verify(jwtString, jwtSecret);
  console.log(empId +" in verify ");
  return empId;

}




module.exports = {
  sign,
  verify,
 
};
