const user = JSON.parse(sessionStorage.getItem("user"));

// Check if the user is logged in
if (user) {

    window.location.href = "http://127.0.0.1:5500/html/home.html";
    
} else {
    // User is not logged in, allow access to login and sign-up pages
    console.log("User not logged in");
}

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("mailsignup").value;
    const username = document.getElementById("usernamesignup").value;
    const full_name = document.getElementById("namesignup").value;
    const password = document.getElementById("passwordsignup").value;
    const confirmPassword = document.getElementById("passwordconfirmsignup").value;
    
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    // We fetch the list of users from JSON file
    fetch("http://localhost:3000/users")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {

            // We check if any user already has the same username or email
            const duplicateUsername = users.some(user => user.username === username);
            const duplicateEmail = users.some(user => user.email === email);
            
            if (duplicateUsername || duplicateEmail) {
                alert("Username or email already exists");
            } else {

                const encoder = new TextEncoder();
                const passwordBuffer = encoder.encode(password);
                
                // Generate salt used to hash password
                const salt = crypto.getRandomValues(new Uint8Array(16));
                
                // Derive key using PBKDF2
                crypto.subtle.importKey(
                    "raw",
                    passwordBuffer,
                    { name: "PBKDF2" },
                    false,
                    ["deriveBits"]
                )
                .then(key => {
                    return crypto.subtle.deriveBits(
                        {
                            name: "PBKDF2",
                            salt: salt,
                            iterations: 100000,
                            hash: { name: "SHA-256" }
                        },
                        key,
                        256 // 256-bit derived key length
                    );
                })
                .then(derivedKey => {
                    // Convert derived key to hexadecimal
                    const hashArray = Array.from(new Uint8Array(derivedKey));
                    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
                    
                    const newUser = {
                        username: username,
                        full_name: full_name,
                        email: email,
                        salt: Array.from(salt), // Convert salt to an array for JSON serialization
                        password: hashHex
                    };
                    
                    // We send a POST request to the server to add a new user
                    fetch("http://localhost:3000/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        window.location.href = "http://127.0.0.1:5500/html/home.html";
                    })
                    .catch(error => {
                        console.error("Error signing up user:", error);
                        alert("Error signing up user");
                    });
                });
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            alert("Error fetching users");
        });
});
