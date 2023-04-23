const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        if (usernameInput.value === "" || passwordInput.value === "") {
            throw new Error("Please provide a username and password");
        }
        const loginInfo = {
            username: usernameInput.value,
            password: passwordInput.value,
        };
        const reg = new RegExp("^[a-zA-Z0-9 -.]+$");
        const usernameCheck = reg.test(usernameInput.value);
        const passwordCheck = reg.test(passwordInput.value);
        if (!usernameCheck || !passwordCheck) {
            throw new Error(
                "Special characters are not allowed in credentials"
            );
        }
        const response = await fetch(
            "https://restaurant-admin-production.up.railway.app/api/v1/login",
            {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        sessionStorage.setItem("UserId", data.id);
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("admin", data.admin);
        errorMessage.textContent = data.msg;
        location.href =
            "https://restaurant-admin-production.up.railway.app/pages/schedule.html";
    } catch (err) {
        console.error(err);
        errorMessage.textContent = `Login failed, ${err}`;
    }
    loginForm.reset();
});
