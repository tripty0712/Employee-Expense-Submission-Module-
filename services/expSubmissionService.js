const empExpense = require("../models/empExpense.js");


async function createExpense(fields,employeeId)
{
   console.log('in create');
  
   let date = getDateTime();
    //let expDate=getDate(fields.getDate);
    return new empExpense({
        ...fields,empId:employeeId,createdDate: date
        
        }).save();

}

async function getEmpExpenseList(empId)
{
 
   return await empExpense.find({empId}).lean().exec();
    

}


async function deleteExpenseRecord(recordId)
{
 
   return await empExpense.deleteOne({_id:recordId}).exec();
    

}


async function fetchExpenseRecord(recordId)
{
 
   return await empExpense.findById({_id:recordId}).exec();
    

}
async function updateExpenseRecord(recordId)
{
 
return await empExpense.updateOne({_id:recordId},{ $set: {'product_name': product_name, 'price': price, 'category': category } });
//return null;    

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
};


