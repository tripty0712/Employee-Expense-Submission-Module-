const bcrypt = require("bcrypt");
const empAuth = require("../models/empAuth.js");
const { getEmployeeDetails } = require("./employeeService.js");
const auth = require("../utils/auth.js");
const SALT_ROUNDS = 10;

async function registerEmployee(fields) {
  //function to check user email already exists
  const foundUser = await getEmpLogin(fields.empId);

  if (foundUser) {
    return "EMP_EXISTS";
  }
  // to verify it's valid employee or not
  const empDetails = await getEmployeeDetails(fields.empId, fields.email);
  if (!empDetails) {
    return "NOT_VALID_EMP";
  }

  return new empAuth({
    ...fields,
    password: await bcrypt.hash(fields.password, SALT_ROUNDS),
  }).save();
  return auth.sign(fields.empId);
}

async function loginUser(email, password) {
  foundUser = await verifyEmail(email);
  if (!foundUser) {
    console.log(`Could not find user with name ${email}`);
    return null;
  }

  const isAuthenticated = await bcrypt.compare(password, foundUser.password);

  if (!isAuthenticated) {
    console.log("invalid");
    return null;
  }
  console.log(foundUser.empId);
  return auth.sign(foundUser.empId);
}

async function verifyEmail(email) {
  foundUser = await empAuth.findOne({ email }).exec();
  if (!foundUser) {
    console.log(foundUser);
    return null;
  } else {
    return foundUser;
  }
}

async function getEmpLogin(empId) {
  foundUser = await empAuth.findOne({ empId }).exec();
  if (!foundUser) {
    console.log(foundUser);
    return null;
  } else {
    return foundUser;
  }
}

module.exports = {
  registerEmployee,
  getEmpLogin,
  loginUser,
  verifyEmail,
};
