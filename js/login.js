/* Password Toggle */

function togglePassword(){

const field = document.getElementById("password")
const toggle = document.querySelector(".password-toggle")

if(field.type === "password"){
field.type = "text"
toggle.innerText = "Hide"
}else{
field.type = "password"
toggle.innerText = "Show"
}

/* Login Button Micro Interaction */

document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault()

const btn = document.getElementById("loginButton")

btn.disabled = true
btn.innerHTML = "Logging in..."

setTimeout(()=>{

btn.innerHTML="Login"
btn.disabled=false
alert("Login submitted")

},1500)

})

}

function checkInfo(){
    const email = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;

    // logic 
    
    if(password.length < 6){
        alert("Password must be at least 6 characters long");
        return false;
    }else {
        localStorage.setItem("user", email);   // email id set in local storage
        return true;
    }  
}