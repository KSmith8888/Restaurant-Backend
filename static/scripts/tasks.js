import { logoutUser } from "./logout-user.js";

const logoutBtn = document.getElementById("logout-button");
const userId = sessionStorage.getItem("UserId");
const admin = sessionStorage.getItem("admin");
const createTaskListModal = document.getElementById("create-task-list-modal");
const createTaskListForm = document.getElementById("create-task-list-form");
const tasksSection = document.getElementById("tasks-section");
const createTaskListCloseBtn = document.getElementById(
    "create-task-list-close-btn"
);
const responseMessage = document.getElementById("response-message");
const updateTasksModal = document.getElementById("update-tasks-modal");
const updateTasksForm = document.getElementById("update-tasks-form");
const updateTasksCloseBtn = document.getElementById("update-tasks-close-btn");
const updateTasksInputContainer = document.getElementById(
    "update-tasks-input-container"
);
const addSingleTaskBtn = document.getElementById("add-single-task-btn");
const tasksDataContainer = document.getElementById("tasks-data-container");

function createTaskElements(taskData) {
    const taskListContainer = document.createElement("div");
    taskListContainer.classList.add("task-list-container");
    tasksDataContainer.prepend(taskListContainer);
    const taskName = document.createElement("h2");
    taskName.classList.add("task-name");
    taskName.textContent = taskData.name;
    taskListContainer.append(taskName);
    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");
    taskListContainer.append(taskList);
    taskData.task_list.forEach((task) => {
        const taskInfo = document.createElement("li");
        taskInfo.classList.add("task-info");
        taskInfo.textContent = task;
        taskList.append(taskInfo);
    });
    if (admin === "true") {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        taskListContainer.append(buttonContainer);
        const updateTaskListBtn = document.createElement("button");
        updateTaskListBtn.classList.add("form-button");
        updateTaskListBtn.textContent = "Update task list";
        updateTaskListBtn.addEventListener("click", () => {
            updateTasksModal.showModal();
            updateTasksForm.dataset.id = taskData.user_id;
            updateTasksForm.dataset.tasks = taskData.task_list;
            addUpdateTasksInputs();
        });
        buttonContainer.append(updateTaskListBtn);
        const deleteTaskListBtn = document.createElement("button");
        deleteTaskListBtn.classList.add("form-button");
        deleteTaskListBtn.textContent = "Delete task list";
        deleteTaskListBtn.addEventListener("click", () => {
            deleteTasks(taskData.user_id);
        });
        buttonContainer.append(deleteTaskListBtn);
    }
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
        tasksDataContainer.replaceChildren();
        const response = await fetch("/api/v1/tasks");
        if (!response.ok) {
            throw new Error(`Error getting tasks data: ${response.status}`);
        }
        const data = await response.json();
        data.forEach((taskList) => {
            createTaskElements(taskList);
        });
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
            createTaskListForm.reset();
            createTaskListModal.close();
        }
    } catch (err) {
        console.error(err);
        responseMessage.textContent = err;
    }
}

async function updateTasks(e) {
    try {
        e.preventDefault();
        const id = updateTasksForm.dataset.id;
        const tasksDataInitial = new FormData(e.target);
        const taskInfo = [];
        for (const entry of tasksDataInitial.entries()) {
            if (entry[1] !== "") {
                taskInfo.push(entry[1]);
            }
        }
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method: "PATCH",
            body: JSON.stringify(taskInfo),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error getting task list data: ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            getAllTasks();
            updateTasksForm.reset();
            updateTasksModal.close();
        }
    } catch (err) {
        responseMessage.textContent = `Error updating task list: ${err}`;
        console.error(err);
    }
}

async function deleteTasks(id) {
    try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Response status error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.msg);
        getAllTasks();
    } catch (err) {
        responseMessage.textContent = `Error deleting task list: ${err}`;
        console.error(err);
    }
}

function addUpdateTasksInputs() {
    const taskList = updateTasksForm.dataset.tasks.split(",");
    updateTasksInputContainer.replaceChildren();
    taskList.forEach((task, index) => {
        const updateTaskLabel = document.createElement("label");
        updateTaskLabel.textContent = "Task:";
        updateTaskLabel.for = `update-task-${index}`;
        updateTasksInputContainer.append(updateTaskLabel);
        const updateTaskInput = document.createElement("input");
        updateTaskInput.id = `update-task-${index}`;
        updateTaskInput.value = task;
        updateTaskInput.type = "text";
        updateTaskInput.name = `task-${index}`;
        updateTaskInput.pattern = "^[a-zA-Z0-9 .-]+$";
        updateTaskInput.minLength = "4";
        updateTaskInput.maxLength = "60";
        updateTasksInputContainer.append(updateTaskInput);
    });
}

createTaskListForm.addEventListener("submit", createTasks);
updateTasksForm.addEventListener("submit", updateTasks);
updateTasksCloseBtn.addEventListener("click", () => {
    updateTasksModal.close();
});

addSingleTaskBtn.addEventListener("click", () => {
    console.log(updateTasksForm.dataset.tasks);
    updateTasksForm.dataset.tasks += ", Test";
    addUpdateTasksInputs();
});

logoutBtn.addEventListener("click", logoutUser);
createTaskListCloseBtn.addEventListener("click", () => {
    createTaskListModal.close();
});

if (userId === null || admin === null) {
    console.error("Credentials not valid");
} else if (admin === "true") {
    const addTasksBtn = document.createElement("button");
    addTasksBtn.addEventListener("click", () => {
        createTaskListModal.showModal();
    });
    addTasksBtn.textContent = "Create new task list";
    addTasksBtn.id = "create-task-list-btn";
    addTasksBtn.classList.add("form-button");
    tasksSection.prepend(addTasksBtn);
    getAllTasks();
} else {
    getUserTasks(userId);
}
