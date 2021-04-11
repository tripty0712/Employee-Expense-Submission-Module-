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


async function getEmployeeRecord(employeeId)
{
  const empData= await Employee.findOne({empId:employeeId}).exec();
  return empData;

}


module.exports = {
  createEmployee,
  listEmployees,
  getEmployeeDetails,
  getEmployeeRecord,
};
