const { response } = require("express");
const { registerEmployee,loginUser,} = require("../services/empAuthService.js");

const { empIsManager,} = require("../services/employeeService.js");

function renderSignupForm(req, res) {
    res.render("signup",{
      layout: "main2",
    });
  }
  async function processSignupSubmission(req, res,next)
 {

    const token = await registerEmployee({ ...req.body });
    if(token === 'EMP_EXISTS')
    { message="The email address entered is already being used. Please select another."}
else if(token === 'NOT_VALID_EMP')
    { message="The Employee Id or Email address entered is not valid. Please try again."}
 else if (token) {
     
      message = "Thank you for registration,Please login to proceed further ";
      res.render("login", { layout: "main2",
        message,  });
     }
       else 
      { message = "An error has occurred. Please try again."; }
 
    res.render("signup", { layout: "main2",
        message,  });
 
  }

  function renderLoginForm(req, res) {
    res.render("login", {
      layout: "main2",
    });
  }
  async function processLoginSubmission(req, res) {
    const token = await loginUser(req.body.email, req.body.password);
    
    if (token !== null && token !=='' && token !== 'undefiened' )
     {
      
      res.cookie("jwt", token, { httpOnly: true });

    
      message = "You have successfully logged in";
      
      const isManager=await empIsManager(req.empId);
      
      console.log(isManager);
     if(isManager)
     {
     
      res.render("manager-home", {
        layout: "main",
        isManager ,
      });
     }
else
{
 
  res.redirect('/home');}
    } 
    else {
      message = "Invalid name or password";
      res.render("login", {
        layout: "main2",
        message,
      });
    }
    
  }

  
function renderSignout(req, res)
 {

  res.clearCookie("jwt");
  res.render("signout", {layout:""});

}
  function renderResetPasswordRequestForm(req, res) {
    res.render("forgotPassword", {
      layout: "main2",
    });
  }
  
  async function processResetPasswordSubmission(req, res)
  {
   const message= await requestPasswordReset(req.body.email);
   res.render("forgotPassword", {
    layout: "main2",
    message,
  });
  }
 
  module.exports = {
    renderSignupForm,
    processSignupSubmission,
    renderLoginForm,
    processLoginSubmission,
    renderSignout,
    
  };
  