async function logoutUser() {
    try {
        const response = await fetch("/api/v1/logout");
        if (!response.ok) {
            throw new Error(`Logout did not complete: ${response.status}`);
        } else {
            sessionStorage.removeItem("UserId");
            sessionStorage.removeItem("admin");
            location.href = "http://127.0.0.1:3000/";
        }
    } catch (err) {
        console.error(err);
    }
}

export { logoutUser };
