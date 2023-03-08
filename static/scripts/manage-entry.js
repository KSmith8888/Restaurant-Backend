import { sanitizeChars } from "./sanitizeChars.js";

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginInfo = {
        username: usernameInput.value,
        password: passwordInput.value,
    };
    const usernameCheck = sanitizeChars(usernameInput.value);
    const passwordCheck = sanitizeChars(passwordInput.value);
    try {
        if (usernameCheck || passwordCheck) {
            throw new Error(
                "Special characters are not allowed in credentials"
            );
        }
        const response = await fetch("http://127.0.0.1:3000/api/v1/login", {
            method: "POST",
            body: JSON.stringify(loginInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success") {
            location.href = "./menu-update.html";
        }
    } catch (err) {
        console.error(err);
        errorMessage.textContent = `Login failed, ${err}`;
    }
    loginForm.reset();
});
