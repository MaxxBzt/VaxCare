document.addEventListener("DOMContentLoaded", function() {


    const user = JSON.parse(sessionStorage.getItem("user"));

    const greetingMessageElement = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    
    // Check if user is logged in
    if (user) {
        greetingMessageElement.textContent = `Welcome ${user.username}!`;
        subtitle.textContent = ""

        document.getElementById("loggedInContent").style.display = "block";

        // Hide content for logged out users
        document.getElementById("loggedOutContent").style.display = "none";

    } else {
        
        // If user is not logged in, display default message
        greetingMessageElement.textContent = "Don't forget your vaccine";
        subtitle.textContent = "ever again"

        document.getElementById("loggedOutContent").style.display = "flex";

        // Hide content for loggin out users
        document.getElementById("loggedInContent").style.display = "none";
    }
});
