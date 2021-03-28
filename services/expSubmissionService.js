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

module.exports={
    createExpense,
    getEmpExpenseList,
};


