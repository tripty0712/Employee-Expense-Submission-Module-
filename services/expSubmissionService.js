const empExpense = require("../models/empExpense.js");

async function getEmpExpenseList(empId,status)
{
 if(!status)
 {status="Saved";}
   return await empExpense.find({empId,expStatus:status}).lean().exec();
    

}


async function getManagerList(empId,status)
{
 
   return await empExpense.find({managerId:empId,expStatus:status}).lean().exec();
    

}
async function createExpense(fields,employeeId)
{
   console.log('in create',fields);
  
   let date = getDateTime();
    //let expDate=getDate(fields.getDate);
    return new empExpense({
        ...fields,empId:employeeId,createdDate: date,expStatus:'Saved'
        
        }).save();

}
async function deleteExpenseRecord(recordId)
{
 
   return await empExpense.deleteOne({_id:recordId}).exec();
    

}


async function fetchExpenseRecord(recordId)
{
 
   return  await empExpense.findOne({ _id:recordId}).lean().then((result)=>{ console.log (result); return result; });
   

   //const data= await empExpense.find({_id:recordId}).exec();
   
    //return data;

}
async function updateExpenseRecord(fields,employeeId)
{
   
   const recordId=fields._id;
   console.log(fields.expStatus);
  return await empExpense.updateOne({_id:recordId,empId:employeeId},
   {$set: {expType:fields.expType,expDate:fields.expDate,
      expReceipt:fields.expReceipt,expAmount:fields.expAmount,expStatus:'Saved' }}).exec();

}


async function submitApprovalExpense(idArray,mngrId)
{
   return await empExpense.updateMany({_id:{ $in: idArray }},{$set:{expStatus:'Pending',managerId:mngrId }}).exec();

}

async function approvedExpenses(idArray)
{
   return await empExpense.updateMany({_id:{ $in: idArray }},{$set:{expStatus:'Approved' }}).exec();

}

async function rejectedExpenses(idArray)
{
   return await empExpense.updateMany({_id:{ $in: idArray }},{$set:{expStatus:'Rejected' }}).exec();

}

function getDateTime()
{
   var today = new Date();

   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   
   var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   
   var dateTime = date+' '+time;
   
return dateTime;


}


function getDate(dateToformat)
{
   var today = dateToformat;

   var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
   
   
return date;


}



module.exports={
    getEmpExpenseList,
    createExpense,
    deleteExpenseRecord,
    updateExpenseRecord,
    fetchExpenseRecord,
    submitApprovalExpense,
    getManagerList,
    rejectedExpenses,
    approvedExpenses,
};


