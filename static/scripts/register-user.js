import { logoutUser } from "./logout-user.js";

const registrationForm = document.getElementById("register-user-profile-form");
const errorMessage = document.getElementById("error-message");
const usernameInput = document.getElementById("register-username-input");
const passwordInput = document.getElementById("register-password-input");
const adminInput = document.getElementById("register-admin-input");
const logoutBtn = document.getElementById("logout-button");
const usersSection = document.getElementById("users-section");
const roleModalCloseBtn = document.getElementById("role-modal-close-btn");
const updateRoleModal = document.getElementById("update-role-modal");
const updateRoleForm = document.getElementById("update-role-form");
const updateFormName = document.getElementById("update-form-name");
const updateRoleInputUser = document.getElementById("update-role-input-user");
const updateRoleInputAdmin = document.getElementById("update-role-input-admin");

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
        getAllUsers();
    } catch (err) {
        console.error(err);
        errorMessage.textContent = `Account registration failed, ${err}`;
    }
});

async function getAllUsers() {
    try {
        usersSection.replaceChildren();
        const response = await fetch("http://127.0.0.1:3000/api/v1/register");
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((user) => {
            const userContainer = document.createElement("div");
            userContainer.classList.add("user-container");
            usersSection.append(userContainer);
            const name = document.createElement("p");
            name.classList.add("user-name");
            name.textContent = `Name: ${user.username}`;
            userContainer.append(name);
            const role = user.admin ? "Admin" : "User";
            const roleEl = document.createElement("p");
            roleEl.classList.add("user-role");
            roleEl.textContent = `Role: ${role}`;
            userContainer.append(roleEl);
            const updateRoleBtn = document.createElement("button");
            updateRoleBtn.classList.add("form-button");
            updateRoleBtn.textContent = "Update Role";
            updateRoleBtn.addEventListener("click", () => {
                updateFormName.textContent = user.username;
                if (user.admin) {
                    updateRoleInputAdmin.checked = "true";
                } else {
                    updateRoleInputUser.checked = "true";
                }
                updateRoleModal.showModal();
                console.log(role);
            });
            userContainer.append(updateRoleBtn);
            const deleteUserBtn = document.createElement("button");
            deleteUserBtn.classList.add("form-button");
            deleteUserBtn.textContent = "Delete User";
            deleteUserBtn.addEventListener("click", () => {
                deleteUser(user._id);
            });
            userContainer.append(deleteUserBtn);
        });
    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(id) {
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/register/${id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.msg);
        getAllUsers();
    } catch (err) {
        console.error(err);
    }
}

logoutBtn.addEventListener("click", logoutUser);
roleModalCloseBtn.addEventListener("click", () => {
    updateRoleModal.close();
});
updateRoleForm.addEventListener("submit", () => {
    console.log("test");
});
getAllUsers();
