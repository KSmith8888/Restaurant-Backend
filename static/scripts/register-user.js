import { logoutUser } from "./logout-user.js";

const registrationForm = document.getElementById("register-user-profile-form");
const errorMessage = document.getElementById("error-message");
const usernameInput = document.getElementById("register-username-input");
const passwordInput = document.getElementById("register-password-input");
const adminInput = document.getElementById("register-admin-input");
const logoutBtn = document.getElementById("logout-button");

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        if (usernameInput.value === "" || passwordInput.value === "") {
            throw new Error("Please provide a username and password");
        }
        const newAccountInfo = {
            username: usernameInput.value,
            password: passwordInput.value,
            admin: adminInput.checked ? true : false,
        };
        const reg = new RegExp("^[a-zA-Z0-9 -.]+$");
        const usernameCheck = reg.test(usernameInput.value);
        const passwordCheck = reg.test(passwordInput.value);
        if (!usernameCheck || !passwordCheck) {
            throw new Error(
                "Special characters are not allowed in credentials"
            );
        }
        const response = await fetch("http://127.0.0.1:3000/api/v1/register", {
            method: "POST",
            body: JSON.stringify(newAccountInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        errorMessage.textContent = data.msg;
        registrationForm.reset();
    } catch (err) {
        console.error(err);
        errorMessage.textContent = `Account registration failed, ${err}`;
    }
});

logoutBtn.addEventListener("click", logoutUser);
