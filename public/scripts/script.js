
const btn = document.querySelector("#btnClick");

btn.addEventListener("click", async (event) => {
  let selected =new Array();
    if (event.target.type === "submit") {
    console.log("Sending POST request");
    
    alert('on click');
            $("#example input[type=checkbox]:checked").each(function () {
                selected.push(this.id);
            });
    
        }

    const response = await axios.post(`http://localhost:4500/home?arrItem=${selected}`); 
    response.then((data)=>{console.log("data:", data); });

    });
   