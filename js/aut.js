/*for(let i=0;i<5;i++){
    setTimeout(()=>{
    console.log(i)
    },100)

}*/
function validate(){
    var uname = document.forms["formin"]["username"].value;
    var pswd = document.forms["formin"]["pass"].value;
    var cofirmpswd = document.forms["formin"]["confirm_pass"].value;
    if(uname=="" || uname==null){
      alert("Username is required");
     
    }

    
        if(pswd==cofirmpswd){
            console.log("Successfully done.");
            window.location.href = 'https://www.google.com/';
            //"../linked file/profile.html";
        }
        else{
            alert("Password doesn't match");
        }
        
  
}

function showpswd(){
    var pswd = document.getElementById("pswd");
  //  var pswd = document.forms["formin"]["pass"].value;
    if(pswd.type ==="password"){
        pswd.type = "text";
    }
    else{
        pswd.type = "password";
    }
}
