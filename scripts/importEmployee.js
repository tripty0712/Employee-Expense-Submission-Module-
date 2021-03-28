const db = require("../db.js");
const { createEmployee} = require("../services/employeeService.js");

const employees = require("../data/employeeData.json");

(async function () {
  for (employee of employees) {
    await createEmployee(employee);
  }

  db.disconnect();
})();
