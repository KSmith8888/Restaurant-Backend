import { logoutUser } from "./logout-user.js";

const logoutBtn = document.getElementById("logout-button");
const responseMessage = document.getElementById("response-message");
const scheduleData = document.getElementById("schedule-data");
const userId = sessionStorage.getItem("UserId");
const admin = sessionStorage.getItem("admin");
const addScheduleModal = document.getElementById("add-schedule-modal");
const addScheduleForm = document.getElementById("add-schedule-form");
const addScheduleCloseBtn = document.getElementById("add-schedule-close-btn");
const addScheduleDayBtn = document.getElementById("add-schedule-day-btn");
const addScheduleDaysContainer = document.getElementById(
    "add-schedule-days-container"
);
let scheduleDays = 1;

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
            scheduleEditBtn.classList.add("schedule-edit-btn");
            scheduleEditBtn.textContent = "Edit";
            scheduleContainer.append(scheduleEditBtn);
            const scheduleDeleteBtn = document.createElement("button");
            scheduleDeleteBtn.classList.add("schedule-delete-btn");
            scheduleDeleteBtn.textContent = "Delete";
            scheduleContainer.append(scheduleDeleteBtn);
        });
        const addScheduleBtn = document.createElement("button");
        addScheduleBtn.addEventListener("click", () => {
            addScheduleModal.showModal();
        });
        addScheduleBtn.textContent = "Add new schedule";
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

if (userId === null || admin === null) {
    console.error("Credentials not valid");
} else if (admin === "true") {
    getAllSchedules();
} else {
    getSchedule(userId);
}

logoutBtn.addEventListener("click", logoutUser);
addScheduleCloseBtn.addEventListener("click", () => {
    addScheduleModal.close();
});
addScheduleDayBtn.addEventListener("click", () => {
    scheduleDays += 1;
    const label = document.createElement("label");
    label.for = `add-schedule-${scheduleDays}`;
    label.textContent = "Schedule:";
    addScheduleDaysContainer.append(label);
    const input = document.createElement("input");
    input.id = `add-schedule-${scheduleDays}`;
    input.type = "text";
    input.name = `schedule-${scheduleDays}`;
    input.pattern = "[0-9 :-]+";
    input.minlength = "3";
    input.maxlength = "12";
    input.required = true;
    addScheduleDaysContainer.append(input);
});
addScheduleForm.addEventListener("submit", createSchedule);
