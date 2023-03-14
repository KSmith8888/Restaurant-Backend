const logoutBtn = document.getElementById("logout-button");
const responseMessage = document.getElementById("response-message");
const scheduleData = document.getElementById("schedule-data");

async function getAllSchedules() {
    try {
        const response = await fetch("/api/v1/schedule");
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        }
        const data = await response.json();
        responseMessage.textContent = "Schedule data is available";
        data.forEach((schedule) => {
            const scheduleInfo = document.createElement("p");
            scheduleInfo.textContent = schedule;
            scheduleData.append(scheduleInfo);
        });
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

async function logoutUser() {
    try {
        const response = await fetch("/api/v1/logout");
        if (!response.ok) {
            throw new Error(`Logout did not complete: ${response.status}`);
        } else {
            location.href = "http://127.0.0.1:3000/";
        }
    } catch (err) {
        console.error(err);
    }
}

logoutBtn.addEventListener("click", logoutUser);
getAllSchedules();
