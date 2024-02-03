// script.js

// Function to redirect to the register page
function redirectToRegister() {
    window.location.href = "Register.html";
  
}

function redirectToLogin(){
    window.location.href = "Login.html";
}

// Attach the function to the Register button
document.getElementById("registerButton").onclick = redirectToRegister;
document.getElementById("loginButton").onclick = redirectToLogin;

