
const cuid = require("cuid");
const { isEmail } = require("validator");
const db = require("../db.js");



//define users collection schema
const empAuthSchema = db.Schema({
  _id: { type: String, default: cuid },
  empId:{ type: String, required: true , trim:true,unique:true}, 
  email: { type: String, required: true, validate: { validator: isEmail },unique:true,trim:true },
  password: { type: String, required: true },
  createdDate:{type: Date},
});


const empAuth = db.model("empLogin", empAuthSchema);

module.exports = empAuth;

