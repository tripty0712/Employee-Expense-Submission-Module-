  
const {getEmpExpenseList, 
          createExpense,
          deleteExpenseRecord,
          updateExpenseRecord,
          fetchExpenseRecord,
          submitApprovalExpense,}=require("../services/expSubmissionService.js")
const expenseType = require("../data/expenseType.js");
const{
  getEmployeeRecord,

}= require("../services/employeeService.js")

const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload());

 function renderAddExpense(req, res) {

    console.log("in add");
    let today=new  Date().toISOString().split('T')[0];
      console.log(today);
         res.render("addNewExpense",{ expenseType,today });
    }

    
 // To add new expense record   
async function processAddExpenseForm(req, res)
 {
    
    let sampleFile;
    
  
    if (req.files) {
    // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
    sampleFile = req.files.expReceipt;   
    const msg=  processUploadFileForm(sampleFile,res);
    }
  
    //service to call create expense in mongodb
    const addExpense= await createExpense({ ...req.body },req.empId);
    if(addExpense)   
    {  res.redirect('/home'); }

 }


 //to delete One Expense Record as a time
async function processDeleteExpenseForm(req, res) {
     
  const id = req.query.id;
  //to delete mongo db record on basis of id
  const isDeleted= await deleteExpenseRecord(id);
   if(isDeleted)   
  {
     res.redirect('/home'); 
    
 }

}

async function fetchEditDataForm(req, res) {
     
  const id = req.query.id;
  //To set date as less then today date 
  let today=new  Date().toISOString().split('T')[0];
   //to modify existing expense record 
  await fetchExpenseRecord(id).then(  (result)=> {
    const expdata={...result  ,expDate: result.expDate.toISOString().split('T')[0]  };
      res.render('editExpense',{expdata,expenseType,today})
  });
  
}



async function updateEditDataForm(req, res) {

  let sampleFile;
      
  if (req.files ) {
  
     // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
      sampleFile = req.files.expReceipt;
      const msg=  processUploadFileForm(sampleFile,res);
    }

      console.log(req.body._id);
      const status= await updateExpenseRecord( {...req.body},req.empId );
      console.log(status);
      if(status)
      res.redirect('/home');   

}

    
async function renderHomeGrid(req, res) {
 
     const status=req.query.status;
     let  empExpenseList;
if(status){
     empExpenseList = await getEmpExpenseList(req.empId,status);}
else
empExpenseList = await getEmpExpenseList(req.empId,status);
   

const expenseList = empExpenseList.map(expense => {return {...expense, expDate: expense.expDate.toISOString().split('T')[0]}})

    
    res.render("home",{empExpenseList:expenseList,
            });
  }

  async function processExpenseApprovalForm(req,res)
  {
    const employeeId=req.empId;
    const idArray= (req.query.arrItem).split(',');

    const empData= await getEmployeeRecord(employeeId);

    const mngr=empData.managerId;

     console.log(mngr);
   
    console.log(idArray);

    const IsUpdated=await submitApprovalExpense(idArray,mngr);
    

  }


function processUploadFileForm(sampleFile,res)
{
    console.log('In upload');
  
    const uploadPath =  './uploads/' + sampleFile.name;
     
    console.log(sampleFile);
    console.log(uploadPath);

    sampleFile.mv(uploadPath, function(err) {
      
    return 'File uploaded!';
    });

}

  module.exports = {
     renderAddExpense,
     processAddExpenseForm,
     processDeleteExpenseForm,
     fetchEditDataForm,
     updateEditDataForm,
     renderHomeGrid,
     processUploadFileForm,
     processExpenseApprovalForm,
   };