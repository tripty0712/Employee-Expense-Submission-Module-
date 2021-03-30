    
    const {getEmpExpenseList, 
          createExpense,
          deleteExpenseRecord,
          updateExpenseRecord,
          fetchExpenseRecord,}=require("../services/expSubmissionService.js")
const expenseType = require("../data/expenseType.js");



 function renderAddExpense(req, res) {
          res.render("addNewExpense", {expenseType });
    }

    
    
async function processAddExpenseForm(req, res) {
    
    console.log('Before add: ' + ({ ...req.body })); 
    const addExpense= await createExpense({ ...req.body },req.empId);
    
    console.log('after add: ' + addExpense ) 
    if(addExpense)   
    {  res.redirect('/home');     
}
}

async function processDeleteExpenseForm(req, res) {
     
  const id = req.query.id;
  const isDeleted= await deleteExpenseRecord(id);
   if(isDeleted)   
  {
   
     res.redirect('/home'); 
    
 }

}

async function fetchEditDataForm(req, res) {
     
  const id = req.query.id;
  let data =[];
   data =await fetchExpenseRecord(id);
   if(data)   
  {
   
   return data;
    
 }

}
async function updateEditDataForm(req, res) {
     
  const id = req.query.id;
  const data = await updateExpenseRecord(id);
   if(data)   
  {
   
   return data;
    
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
     processDeleteExpenseForm,
     fetchEditDataForm,
     updateEditDataForm,
     renderHomeGrid,
   };