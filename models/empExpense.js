require("dotenv").config();
const cuid = require("cuid");
const db = require("../db.js");
const expenseType = require("../data/expenseType.js");



//define empExpense collection schema
const empExpenseSchema = db.Schema({
  _id: { type: String, default: cuid },
  empId:{ type:Number,unique:false, trim:true},
  expDate: { type:Date, required: true },
  expAmount: { type:Number, required: true},
  expReceipt:{ type: String },
  managerId:{ type: String,  trim:true},
  expStatus:{type:String } ,
  createdDate:{type : Date},
 expType: { type: String, enum: expenseType,
  },
});



const empExpense = db.model("empexpense", empExpenseSchema);
//new empExpense({empId:75206,expDate:new Date(2021,1,1)  ,expAmount:70}).save().then(()=>console.log('user created'));
module.exports = empExpense;


