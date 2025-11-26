document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    try {
        const response = await fetch("http://localhost:5000/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success) {
                // mark as logged in so dashboard.js won't redirect back
                localStorage.setItem("isLoggedIn", "true");
                alert("Login Successful!");
                window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error, check console");
    }
});
