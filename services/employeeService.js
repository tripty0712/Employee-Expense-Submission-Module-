const Employee = require("../models/employee.js");

function createEmployee(fields) {
  return new Employee(fields).save();
}



function listEmployees() {
  return Employee.find().setOptions({ lean: true }).exec();
}

async function getEmployeeDetails(empId,email) {
  foundEmployee = await Employee.findOne({ empId ,email}).exec();
    if (!foundEmployee) 
    {
      console.log (foundEmployee);
      return null;
    }
 else{
   return foundEmployee;
 }
}




module.exports = {
  createEmployee,
  listEmployees,
  getEmployeeDetails,
};
