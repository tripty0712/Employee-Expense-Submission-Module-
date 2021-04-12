const employee = require("../models/employee.js");
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

async function   getEmployeeName(employeeId)
{
  const empData= await Employee.findOne({empId:employeeId}).exec();
  return empData.firstName+" "+ empData.lastName;
}

async function empIsManager(empId)
{
 return await employee.findOne({managerId: empId }).exec();

}

module.exports = {
  createEmployee,
  listEmployees,
  getEmployeeDetails,
  getEmployeeRecord,
  empIsManager,
  getEmployeeName,
};
