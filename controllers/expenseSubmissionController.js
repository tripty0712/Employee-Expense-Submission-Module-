const {getEmpExpenseList, createExpense}=require("../services/expSubmissionService.js")
const expenseType = require("../data/expenseType.js");

const auth = require("../utils/auth.js");
const { signedCookies } = require("cookie-parser");

 function renderAddExpense(req, res) {
          res.render("addNewExpense", {expenseType });
    }

    
    
async function processAddExpenseForm(req, res) {
     
    const addExpense= await createExpense(req.empId);
    if(addExpense)   
    {
     const empExpenseList = await getEmpExpenseList(req.empId)
        res.render("home",{Expenselist :empExpenseList , 
          layout: "main",
 });
}
}


    
async function renderHomeGrid(req, res) {

    const empExpenseList = await getEmpExpenseList(req.empId);

    res.render("home",{empExpenseList,
            });
  }

  module.exports = {
     renderAddExpense,
     processAddExpenseForm,
     renderHomeGrid,
    
   };