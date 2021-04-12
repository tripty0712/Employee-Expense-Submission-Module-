const cuid = require("cuid");
const { isEmail } = require("validator");
const db = require("../db.js");

//define users collection schema
const employeeSchema = db.Schema({
  _id: { type: String, default: cuid },
  empId: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    validate: { validator: isEmail },
    unique: true,
    trim: true,
  },
  managerId: { type: Number, required: true, trim: true },
});

const employee = db.model("employeeMaster", employeeSchema);

module.exports = employee;
