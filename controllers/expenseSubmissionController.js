const empExpense = require("../models/empExpense.js");    
    const {getEmpExpenseList, 
          createExpense,
          deleteExpenseRecord,
          updateExpenseRecord,
          fetchExpenseRecord,}=require("../services/expSubmissionService.js")
const expenseType = require("../data/expenseType.js");

const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

 function renderAddExpense(req, res) {
          res.render("addNewExpense", {expenseType });
    }

    
    
async function processAddExpenseForm(req, res)
 {
    
    let sampleFile;
    
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.expReceipt;
   
  const msg=  processUploadFileForm(sampleFile,res);
    const addExpense= await createExpense({ ...req.body },req.empId);
    if(addExpense)   
    {  res.redirect('/home'); }

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

  return  await empExpense.findOne({ _id:id}).lean().then((result)=>{ console.log (result);res.render('editExpense',{expdata:result}) });
   
 
   //fetchExpenseRecord(id).then(  (expdata)=> {
   // console.log ("Inside :"+ expdata);  
   // console.log(expdata.length);
   // res.render('editExpense', {bag:expdata, expenseType:expenseType});;
  //})
 
 
 
}



async function updateEditDataForm(req, res) {
  const recordId = req.query.id
  const status= await updateExpenseRecord( {...req.body},recordId,req.empId );
 console.log(status);
  if(status)
   res.redirect('/home');   

}

    
async function renderHomeGrid(req, res) {

    const empExpenseList = await getEmpExpenseList(req.empId);
     res.render("home",{empExpenseList,
            });
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
   };