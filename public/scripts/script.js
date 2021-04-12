
const btn = document.querySelector("#btnClick");
if(btn)
{
btn.addEventListener("click", async (event) => {
  let selected =new Array();
    if (event.target.type === "submit") {
    console.log("Sending POST request");
    
               $("#example input[type=checkbox]:checked").each(function () {
                selected.push(this.id);
            });
            if (selected.length === 0) {
              alert('Please select record before proceed to any action')
             }
          else {

              axios.post(`http://localhost:4500/home?arrItem=${selected}`)
                  .then((data) => { console.log("data:", data); 
                  window.location = '/home';}).catch(err => console.log(err));

          }
        }
    });
   
   }


    const btnApprove = document.querySelector("#btnApproveClick");
if(btnApprove)
{
    btnApprove.addEventListener("click", async (event) => {
  let selected =new Array();
    if (event.target.type === "button") {
    console.log("Sending POST request");
    
               $("#example input[type=checkbox]:checked").each(function () {
                selected.push(this.id);
            });
    alert(selected);
            if(selected.length=== 0)
            { alert('Please select record before proceed to any action') ;
            }
         else
         {
            alert('in process approval');
             axios.post(`http://localhost:4500/manager-home?actionType=Approve&arrItem=${selected}`) .then((data) => { console.log("data:", data); 
             window.location = '/manager-home';}).catch(err => console.log(err));

                
         }
    }
    });
   }  

    const btnReject = document.querySelector("#btnRejectClick");
if(btnReject)
{
    btnReject.addEventListener("click", async (event) => {
  let selected =new Array();
    if (event.target.type === "button") {
    console.log("Sending POST request");
    
  
            $("#example input[type=checkbox]:checked").each(function () {
                selected.push(this.id);
            });
    
            if(selected.length=== 0)
            { alert('Please select record before proceed to any action') }
            
         else
         {

          axios.post(`http://localhost:4500/manager-home?actionType=Reject&arrItem=${selected}`) .then((data) => { console.log("data:", data); 
          window.location = '/manager-home';}).catch(err => console.log(err));

         
         }
        }
    });
}