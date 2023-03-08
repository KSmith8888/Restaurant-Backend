import { sanitizeChars } from "./sanitizeChars";

const registrationForm = document.getElementById("register-user-profile-form");
const errorMessage = document.getElementById("error-message");
const usernameInput = document.getElementById("register-username-input");
const passwordInput = document.getElementById("register-password-input");
const adminInput = document.getElementById("register-admin-input");

registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameCheck = sanitizeChars(usernameInput.value);
    const passwordCheck = sanitizeChars(passwordInput.value);
    const newAccountInfo = {
        username: usernameInput.value,
        password: passwordInput.value,
        admin: adminInput.checked ? true : false,
    };
    try {
        if (usernameCheck || passwordCheck) {
            throw new Error(
                "Special characters are not allowed in credentials"
            );
        }
        const response = await fetch(
            "http://127.0.0.1:3000/api/v1/login/create",
            {
                method: "POST",
                body: JSON.stringify(newAccountInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        if (data.status === "success") {
            errorMessage.textContent = `Account has been created`;
        }
    } catch (err) {
        console.error(err);
        errorMessage.textContent = `Account registration failed, ${err}`;
    }
});
