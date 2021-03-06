require("dotenv").config();
const express = require("express");
const expressHandlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { authenticateUser } = require("./middleware/authentication.js");
const fileUpload = require("express-fileupload");

const {
  renderHomeGrid,
  renderAddExpense,
  processAddExpenseForm,
  processDeleteExpenseForm,
  fetchEditDataForm,
  updateEditDataForm,
  processExpenseApprovalForm,
  renderManagerGrid,
  processExpensesRecords,
} = require("./controllers/expenseSubmissionController.js");

const {
  renderSignupForm,
  processSignupSubmission,
  renderLoginForm,
  processLoginSubmission,
  renderSignout,
} = require("./controllers/employeeController.js");

const app = express();

// configure express to use handlebars
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

// middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// enable files upload
app.use(fileUpload());

// routing

app.get("/signup", renderSignupForm);
app.post("/signup", processSignupSubmission);

app.get("/login", renderLoginForm);
app.post("/login", processLoginSubmission);

app.use(authenticateUser);
app.get("/signout", renderSignout);

app.get("/home", renderHomeGrid);
app.get("/approvedExpenses", renderHomeGrid);
app.get("/addNewExpense", renderAddExpense);
app.post("/addNewExpense", processAddExpenseForm);
app.get("/editExpense", fetchEditDataForm);
app.post("/editExpense", updateEditDataForm);
app.get("/delete", processDeleteExpenseForm);
app.post("/home", processExpenseApprovalForm);
app.get("/manager-home", renderManagerGrid);
app.post("/manager-home", processExpensesRecords);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
});

// start the server
app.listen(4500, () => {
  console.log("Express started on port 4500");
});
