import { logoutUser } from "./logout-user.js";

const logoutBtn = document.getElementById("logout-button");
const responseMessage = document.getElementById("response-message");
const scheduleData = document.getElementById("schedule-data");
const userId = sessionStorage.getItem("UserId");
const admin = sessionStorage.getItem("admin");
const addScheduleModal = document.getElementById("add-schedule-modal");
const addScheduleForm = document.getElementById("add-schedule-form");
const addScheduleCloseBtn = document.getElementById("add-schedule-close-btn");
const updateScheduleModal = document.getElementById("update-schedule-modal");
const updateScheduleForm = document.getElementById("update-schedule-form");
const updateScheduleCloseBtn = document.getElementById(
    "update-schedule-close-btn"
);
const updateScheduleInputContainer = document.getElementById(
    "update-schedule-input-container"
);

async function getAllSchedules() {
    try {
        scheduleData.replaceChildren();
        const response = await fetch("/api/v1/schedule");
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((entry) => {
            const scheduleContainer = document.createElement("div");
            scheduleContainer.classList.add("schedule-container");
            scheduleData.append(scheduleContainer);
            const scheduleName = document.createElement("p");
            scheduleName.classList.add("schedule-name");
            scheduleName.textContent = entry.name;
            scheduleContainer.append(scheduleName);
            entry.schedule.forEach((day) => {
                const scheduleInfo = document.createElement("p");
                scheduleInfo.classList.add("schedule-info");
                scheduleInfo.textContent = day;
                scheduleContainer.append(scheduleInfo);
            });
            const scheduleEditBtn = document.createElement("button");
            scheduleEditBtn.classList.add("form-button");
            scheduleEditBtn.textContent = "Edit";
            scheduleEditBtn.addEventListener("click", () => {
                updateScheduleModal.showModal();
                updateScheduleForm.dataset.user_id = entry.user_id;
                updateScheduleForm.dataset.schedule = entry.schedule;
                addUpdateScheduleInputs();
            });
            scheduleContainer.append(scheduleEditBtn);
            const scheduleDeleteBtn = document.createElement("button");
            scheduleDeleteBtn.classList.add("form-button");
            scheduleDeleteBtn.textContent = "Delete";
            scheduleDeleteBtn.addEventListener("click", () => {
                deleteSchedule(entry.user_id);
            });
            scheduleContainer.append(scheduleDeleteBtn);
        });
        const addScheduleBtn = document.createElement("button");
        addScheduleBtn.addEventListener("click", () => {
            addScheduleModal.showModal();
        });
        addScheduleBtn.textContent = "Add new schedule";
        addScheduleBtn.classList.add("form-button");
        scheduleData.append(addScheduleBtn);
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

async function getSchedule(id) {
    try {
        const response = await fetch(`/api/v1/schedule/${id}`);
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        }
        const data = await response.json();
        const scheduleContainer = document.createElement("div");
        scheduleContainer.classList.add("schedule-container");
        scheduleData.append(scheduleContainer);
        const scheduleName = document.createElement("p");
        scheduleName.classList.add("schedule-name");
        scheduleName.textContent = data.name;
        scheduleContainer.append(scheduleName);
        data.schedule.forEach((day) => {
            const scheduleInfo = document.createElement("p");
            scheduleInfo.classList.add("schedule-info");
            scheduleInfo.textContent = day;
            scheduleContainer.append(scheduleInfo);
        });
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

async function createSchedule(e) {
    try {
        e.preventDefault();
        const form = e.target;
        const scheduleDataInitial = new FormData(form);
        const scheduleDataFinal = {
            name: "",
            scheduleInfo: [],
        };
        for (const entry of scheduleDataInitial.entries()) {
            if (entry[0] === "name") {
                scheduleDataFinal.name = entry[1];
            } else {
                scheduleDataFinal.scheduleInfo.push(entry[1]);
            }
        }
        const response = await fetch("/api/v1/schedule", {
            method: "POST",
            body: JSON.stringify(scheduleDataFinal),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            getAllSchedules();
            addScheduleForm.reset();
            addScheduleModal.close();
        }
    } catch (err) {
        responseMessage.textContent = `Error creating schedule data: ${err}`;
        console.error(err);
    }
}

async function updateSchedule(e) {
    try {
        e.preventDefault();
        const id = updateScheduleForm.dataset.user_id;
        const scheduleDataInitial = new FormData(e.target);
        const scheduleDataFinal = {
            scheduleInfo: [],
        };
        for (const entry of scheduleDataInitial.entries()) {
            scheduleDataFinal.scheduleInfo.push(entry[1]);
        }
        const response = await fetch(`/api/v1/schedule/${id}`, {
            method: "PATCH",
            body: JSON.stringify(scheduleDataFinal),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            getAllSchedules();
            updateScheduleForm.reset();
            updateScheduleModal.close();
        }
    } catch (err) {
        responseMessage.textContent = `Error creating schedule data: ${err}`;
        console.error(err);
    }
}

async function deleteSchedule(id) {
    try {
        const response = await fetch(`/api/v1/schedule/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.msg);
        getAllSchedules();
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

function addUpdateScheduleInputs() {
    const schedule = updateScheduleForm.dataset.schedule.split(",");
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    updateScheduleInputContainer.replaceChildren();
    schedule.forEach((day, index) => {
        const updateDayLabel = document.createElement("label");
        updateDayLabel.for = `update-schedule-${days[index]}`;
        updateDayLabel.textContent = `${days[index]}:`;
        updateScheduleInputContainer.append(updateDayLabel);
        const updateDayInput = document.createElement("input");
        updateDayInput.id = `update-schedule-${days[index]}`;
        updateDayInput.type = "text";
        updateDayInput.value = day;
        updateDayInput.name = `schedule-${days[index]}`;
        updateScheduleInputContainer.append(updateDayInput);
    });
}

logoutBtn.addEventListener("click", logoutUser);
addScheduleCloseBtn.addEventListener("click", () => {
    addScheduleModal.close();
});
addScheduleForm.addEventListener("submit", createSchedule);
updateScheduleCloseBtn.addEventListener("click", () =>
    updateScheduleModal.close()
);
updateScheduleForm.addEventListener("submit", updateSchedule);

if (userId === null || admin === null) {
    console.error("Credentials not valid");
} else if (admin === "true") {
    getAllSchedules();
} else {
    getSchedule(userId);
}
