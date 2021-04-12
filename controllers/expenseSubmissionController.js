//importing services  
const {getEmpExpenseList, 
          createExpense,
          deleteExpenseRecord,
          updateExpenseRecord,
          fetchExpenseRecord,
          submitApprovalExpense,
          getManagerList,
          approvedExpenses,
          rejectedExpenses,        
        }=require("../services/expSubmissionService.js")

const expenseType = require("../data/expenseType.js");
const{
  getEmployeeName,empIsManager

}= require("../services/employeeService.js")


//Render to main grid after login 
async function renderHomeGrid(req, res,next) {
 

  //get the status from querystring
     const status=req.query.status;

     let  empExpenseList;
     console.log(status);
     try{
      if(status)
       {empExpenseList = await getEmpExpenseList(req.empId,status);}
      else
      
      {empExpenseList = await getEmpExpenseList(req.empId,status);}
        console.log(empExpenseList);
      //to fetch the name of employee
      const employeeName=await getEmployeeName(req.empId);

      //check if employee is manager
      const isManager=await empIsManager(req.empId);

      const expenseList = empExpenseList.map(expense => {return {...expense, expDate: expense.expDate.toISOString().split('T')[0]}})
      if(status==='Approved')
      { console.log('in approved');
          res.render("approvedExpenses",{empExpenseList:expenseList,employeeName,isManager  });}
        else
        { console.log('in home grid');
          res.render("home",{empExpenseList:expenseList,status,employeeName,isManager });}
  }
  catch{

    next(error);
  }
}
function renderAddExpense(req, res,next) {

    try {
      
      let today=new  Date().toISOString().split('T')[0];
      console.log(today);
      res.render("addNewExpense",{ expenseType,today });
      
    }
    catch (error) {
      next(error);
      } 

    }

    
 // To add new expense record   
async function processAddExpenseForm(req, res,next)
 {
    
    let sampleFile;
     try{
    if (req.files) {
    // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
    sampleFile = req.files.expReceipt; 
    console.log('input file',sampleFile)  ;
    const msg=  processUploadFileForm(sampleFile,res);
    }
  
    //service to call create expense in mongodb
    const addExpense= await createExpense({ ...req.body },req.empId);
    if(addExpense)   
    {  res.redirect('/home'); }
  }
  catch (error) {
    next(error);
    }
 }


 //to delete One Expense Record as a time
async function processDeleteExpenseForm(req, res,next) {
     
  const id = req.query.id;
  try{
  //to delete mongo db record on basis of id
  const isDeleted= await deleteExpenseRecord(id);
   if(isDeleted)   
  {
     res.redirect('/home'); 
    
 }
}
catch (error) {
  next(error);
  }
}

async function fetchEditDataForm(req, res,next) {
     
  const id = req.query.id;
  //To set date as less then today date 
  let today=new  Date().toISOString().split('T')[0];
  try {
         //to modify existing expense record 
          await fetchExpenseRecord(id).then(  (result)=> {
          const expdata={...result  ,expDate: result.expDate.toISOString().split('T')[0]  };
          res.render('editExpense',{expdata,expenseType,today})});
     }
  catch (error) {
  next(error);
    }
}

async function updateEditDataForm(req, res,next) 
{

  let sampleFile;
  try{    
       if (req.files ) {
  
        // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
          sampleFile = req.files.expReceipt;
          const msg=  processUploadFileForm(sampleFile,res);
          console.log('in file upload');
      } 

      console.log(req.body.expReceipt);
      const status= await updateExpenseRecord( {...req.body},req.empId );
      console.log(status);
      if(status)
      res.redirect('/home');
  } 
      catch (error) {
        next(error);
          }   

}

  async function processExpenseApprovalForm(req,res)
  {
    const employeeId=req.empId;
    const idArray= (req.query.arrItem).split(',');
    console.log(idArray);
     try{

      //fetching the employee manager information from master table
    const empData= await getEmployeeRecord(employeeId);

    const mngr=empData.managerId;

     console.log(mngr);
    
    const IsUpdated=await submitApprovalExpense(idArray,mngr);

    res.redirect('/home'); 
     }
     catch (error) {
  next(error);
    }

  }

  async function renderManagerGrid(req, res) {
 
    //get the status from querystring
    let status=req.query.status;
    let  managerList;
    let expenseList;
   //to fetch the name of employee
   
  
   const employeeName=await getEmployeeName(req.empId);
  

  if(!status){status="Pending";  }

       managerList = await getManagerList(req.empId,status);

       if(managerList)
    {   
    expenseList = managerList.map(expense => {return {...expense, expDate: expense.expDate.toISOString().split('T')[0]}})
    }
   let isManager=true;

   let expStatus;
   if (status==='Pending')
   { expStatus="all";}
    res.render("manager-home",{managerList:expenseList,status,employeeName,isManager,expStatus });
  
 }

async function processExpensesRecords (req,res)
{
  const employeeId=req.empId;

  const actionRequest=req.query.actionType;
  console.log("process");
  const idArray= (req.query.arrItem).split(',');
 
  console.log(actionRequest);
  let IsUpdated;
  if (actionRequest === 'Approve')
  {
    console.log('in approvew');
    IsUpdated =await approvedExpenses(idArray);

  }
  if(actionRequest === 'Reject')
  {
    console.log('in reject');
    IsUpdated =await rejectedExpenses(idArray);
  }

  let isManager=true;
  res.redirect('/manager-home');



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
     renderManagerGrid,
     processExpensesRecords,
   };