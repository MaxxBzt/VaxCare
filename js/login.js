const user = JSON.parse(sessionStorage.getItem("user"));

// Check if the user is logged in
if (user) {

    window.location.href = "http://127.0.0.1:5500/html/home.html";

} else {
    // User is not logged in, allow access to login and sign-up pages
    console.log("User not logged in");
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("emaillogin").value;
    const password = document.getElementById("passwordlogin").value;

    // We fetch list of users from JSON file
    fetch("http://localhost:3000/users")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            // we find the user with the provided email address
            const user = users.find(user => user.email === email);
            console.log(user)
            
            
            if (!user) {
                alert("User not found");
                return;
            }

            // Convert password to ArrayBuffer
            const encoder = new TextEncoder();

            // Convert password to ArrayBuffer
            const storedSaltArray = Object.values(user.salt);
            const storedSalt = new Uint8Array(storedSaltArray);

            // Derive key using PBKDF2 with stored salt
            crypto.subtle.importKey(
                "raw",
                encoder.encode(password),
                { name: "PBKDF2" },
                false,
                ["deriveBits"]
            )
            .then(key => {
                return crypto.subtle.deriveBits(
                    {
                        name: "PBKDF2",
                        salt: storedSalt,
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


                if (hashHex === user.password) {
                    alert("Login successful");

                    sessionStorage.setItem("user", JSON.stringify(user));

                    window.location.href = "http://127.0.0.1:5500/html/home.html";
                } else {
                    // Incorrect password
                    alert("Incorrect password");
                }
            })
            .catch(error => {
                console.error("Error hashing password:", error);
                alert("Error hashing password. Please try again.");
            });
        })  
        .catch(error => {
            console.error("Error fetching users:", error);
            alert("Error fetching users");
        });
});
