//importing services
const {
  getEmpExpenseList,
  createExpense,
  deleteExpenseRecord,
  updateExpenseRecord,
  fetchExpenseRecord,
  submitApprovalExpense,
  getManagerList,
  approvedExpenses,
  rejectedExpenses,
} = require("../services/expSubmissionService.js");

const expenseType = require("../data/expenseType.js");
const {
  getEmployeeName,
  empIsManager,
  getEmployeeRecord,
} = require("../services/employeeService.js");

//Render to main grid after login
async function renderHomeGrid(req, res) {
  //get the status from querystring
  const status = req.query.status;

  let empExpenseList;

  try {
    if (status) {
      empExpenseList = await getEmpExpenseList(req.empId, status);
    } else {
      empExpenseList = await getEmpExpenseList(req.empId, status);
    }

    //to fetch the name of employee
    const employeeName = await getEmployeeName(req.empId);

    //check if employee is manager
    const isManager = await empIsManager(req.empId);

    const expenseList = empExpenseList.map((expense) => {
      return {
        ...expense,
        expDate: expense.expDate.toISOString().split("T")[0],
      };
    });
    if (status === "Approved") {
      res.render("approvedExpenses", {
        empExpenseList: expenseList,
        employeeName,
        isManager,
      });
    } else {
      res.render("home", {
        empExpenseList: expenseList,
        status,
        employeeName,
        isManager,
      });
    }
  } catch {
    res.render("error", { message: error });
    //to do render error page
  }
}
function renderAddExpense(req, res) {
  try {
    let today = new Date().toISOString().split("T")[0];
    console.log(today);
    res.render("addNewExpense", { expenseType, today });
  } catch (error) {
    res.render("error", { message: error });
  }
}

// To add new expense record
async function processAddExpenseForm(req, res) {
  console.log("file name:", req.files);
  let sampleFile;
  try {
    if (req.files) {
      // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
      sampleFile = req.files.expReceipt;
      console.log(">>>>>>>>>>>>>>>>>input file::::: ", sampleFile);
      processUploadFileForm(sampleFile, res);
    }

    //service to call create expense in mongodb
    const addExpense = await createExpense(
      { ...req.body, expReceipt: sampleFile.name },
      req.empId
    );
    if (addExpense) {
      res.redirect("/home");
    }
  } catch (error) {
    //to do error page
    console.log("process add expense form error", error);
    res.render("error", { message: error });
  }
}

//to delete One Expense Record as a time
async function processDeleteExpenseForm(req, res) {
  const id = req.query.id;
  try {
    //to delete mongo db record on basis of id
    const isDeleted = await deleteExpenseRecord(id);
    if (isDeleted) {
      res.redirect("/home");
    }
  } catch (error) {
    res.render("error", { message: error });
  }
}

async function fetchEditDataForm(req, res) {
  const id = req.query.id;
  //To set date as less then today date
  let today = new Date().toISOString().split("T")[0];
  try {
    //to modify existing expense record
    await fetchExpenseRecord(id).then((result) => {
      const expdata = {
        ...result,
        expDate: result.expDate.toISOString().split("T")[0],
      };
      res.render("editExpense", { expdata, expenseType, today });
    });
  } catch (error) {
    res.render("error", { message: error });
  }
}

async function updateEditDataForm(req, res) {
  let sampleFile;
  try {
    if (req.files) {
      // The name of the input field (i.e. "expReceipt") is used to retrieve the uploaded file
      sampleFile = req.files.expReceipt;
      console.log(">>>>>>>>>>>>>>>>>input file::::: ", sampleFile);
      processUploadFileForm(sampleFile, res);
    }

    console.log({ ...req.body });

    const status = await updateExpenseRecord(
      { ...req.body, expReceipt: sampleFile.name },
      req.empId
    );
    console.log(status);
    if (status) res.redirect("/home");
  } catch (error) {
    res.render("error", { message: error });
  }
}

async function processExpenseApprovalForm(req, res) {
  const employeeId = req.empId;
  const idArray = req.query.arrItem.split(",");
  console.log(idArray);
  try {
    //fetching the employee manager information from master table
    const empData = await getEmployeeRecord(employeeId);

    const mngr = empData.managerId;

    console.log(mngr);

    const IsUpdated = await submitApprovalExpense(idArray, mngr);

    res.redirect("/home");
  } catch (error) {
    console.log("In approval Form", error);
    res.render("error", { message: error });
  }
}

async function renderManagerGrid(req, res) {
  //get the status from querystring
  let status = req.query.status;
  let managerList;
  let expenseList;
  //to fetch the name of employee

  const employeeName = await getEmployeeName(req.empId);

  if (!status) {
    status = "Pending";
  }

  managerList = await getManagerList(req.empId, status);

  if (managerList) {
    expenseList = managerList.map((expense) => {
      return {
        ...expense,
        expDate: expense.expDate.toISOString().split("T")[0],
      };
    });
  }
  let isManager = true;

  let expStatus;
  if (status === "Pending") {
    expStatus = "all";
  }
  res.render("manager-home", {
    managerList: expenseList,
    status,
    employeeName,
    isManager,
    expStatus,
  });
}

async function processExpensesRecords(req, res) {
  const employeeId = req.empId;

  const actionRequest = req.query.actionType;
  console.log("process");
  const idArray = req.query.arrItem.split(",");

  console.log(actionRequest);
  let IsUpdated;
  if (actionRequest === "Approve") {
    console.log("in approvew");
    IsUpdated = await approvedExpenses(idArray);
  }
  if (actionRequest === "Reject") {
    console.log("in reject");
    IsUpdated = await rejectedExpenses(idArray);
  }

  let isManager = true;
  res.redirect("/manager-home");
}

function processUploadFileForm(sampleFile, res) {
  console.log("In upload");

  const uploadPath = "./public/uploads/" + sampleFile.name;

  console.log(sampleFile);
  console.log(uploadPath);

  sampleFile.mv(uploadPath, function (err) {
    console.log("In upload file form err", err);
    return "File uploaded!";
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
