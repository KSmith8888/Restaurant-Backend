const usernameText = document.getElementById("username-text");

usernameText.textContent = `User: ${sessionStorage.getItem("username")}`;
