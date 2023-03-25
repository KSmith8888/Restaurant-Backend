import { logoutUser } from "./logout-user.js";

const logoutBtn = document.getElementById("logout-button");
const userId = sessionStorage.getItem("UserId");
const admin = sessionStorage.getItem("admin");
const addTasksModal = document.getElementById("add-tasks-modal");
const addTasksForm = document.getElementById("add-tasks-form");
const tasksSection = document.getElementById("tasks-section");
const addTasksCloseBtn = document.getElementById("add-tasks-close-btn");
const responseMessage = document.getElementById("response-message");

function createTaskElements(taskData) {
    const taskListContainer = document.createElement("div");
    taskListContainer.classList.add("task-list-container");
    tasksSection.prepend(taskListContainer);
    const taskName = document.createElement("h2");
    taskName.classList.add("task-name");
    taskName.textContent = taskData.name;
    taskListContainer.append(taskName);
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");
    taskListContainer.append(taskList);
    taskData.task_list.forEach((task) => {
        const taskInfo = document.createElement("li");
        taskInfo.classList.add("schedule-info");
        taskInfo.textContent = task;
        taskList.append(taskInfo);
    });
}

async function getUserTasks(id) {
    try {
        const response = await fetch(`/api/v1/tasks/${id}`);
        if (!response.ok) {
            throw new Error(`Error getting tasks data: ${response.status}`);
        }
        const data = await response.json();
        createTaskElements(data);
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

async function getAllTasks() {
    try {
        tasksSection.replaceChildren();
        const response = await fetch("/api/v1/tasks");
        if (!response.ok) {
            throw new Error(`Error getting tasks data: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((taskList) => {
            createTaskElements(taskList);
        });
        const addTasksBtn = document.createElement("button");
        addTasksBtn.addEventListener("click", () => {
            addTasksModal.showModal();
        });
        addTasksBtn.textContent = "Add Tasks";
        addTasksBtn.classList.add("form-button");
        tasksSection.append(addTasksBtn);
    } catch (err) {
        responseMessage.textContent = `Error getting schedule data: ${err}`;
        console.error(err);
    }
}

async function createTasks(e) {
    try {
        e.preventDefault();
        const form = e.target;
        const taskDataInitial = new FormData(form);
        const taskDataFinal = {
            name: "",
            taskInfo: [],
        };
        for (const entry of taskDataInitial.entries()) {
            if (entry[0] === "name") {
                taskDataFinal.name = entry[1];
            } else {
                taskDataFinal.taskInfo.push(entry[1]);
            }
        }
        const response = await fetch("/api/v1/tasks", {
            method: "POST",
            body: JSON.stringify(taskDataFinal),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            getAllTasks();
            addTasksForm.reset();
            addTasksModal.close();
        }
    } catch (err) {
        console.error(err);
        responseMessage.textContent = err;
    }
}

addTasksForm.addEventListener("submit", createTasks);

logoutBtn.addEventListener("click", logoutUser);
addTasksCloseBtn.addEventListener("click", () => {
    addTasksModal.close();
});

if (userId === null || admin === null) {
    console.error("Credentials not valid");
} else if (admin === "true") {
    getAllTasks();
} else {
    getUserTasks(userId);
}
