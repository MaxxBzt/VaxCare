document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function() {
        // Clear user information from session storage
        sessionStorage.removeItem("user");


        window.location.href = "http://127.0.0.1:5500/html/login.html"; 
    });
});

document.addEventListener("DOMContentLoaded", function() {


    const user = JSON.parse(sessionStorage.getItem("user"));
    
    // Check if user is logged in
    if (user) {

        document.getElementById("loggedInContent").style.display = "block";

        // Hide content for logged out users
        document.getElementById("loggedOutContent").style.display = "none";

    } else {

        document.getElementById("loggedOutContent").style.display = "flex";

        // Hide content for loggin out users
        document.getElementById("loggedInContent").style.display = "none";
    }
});
