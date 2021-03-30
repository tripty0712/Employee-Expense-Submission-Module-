const empExpense = require("../models/empExpense.js");


async function createExpense(empId)
{
    return new empExpense({
        ...fields,
        
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

module.exports={
    getEmpExpenseList,
    createExpense,
    deleteExpenseRecord,
    updateExpenseRecord,
    fetchExpenseRecord,
};


