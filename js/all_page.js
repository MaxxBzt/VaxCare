document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function() {
        // Clear user information from session storage
        sessionStorage.removeItem("user");


        window.location.href = "http://127.0.0.1:5500/html/login.html"; 
    });
});
