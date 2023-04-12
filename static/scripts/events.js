const addEventForm = document.getElementById("add-event-form");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const dateInput = document.getElementById("date-input");
const usernameText = document.getElementById("username-text");
const eventsSection = document.getElementById("events-section");
const addEventErrorMsg = document.getElementById("add-event-error-message");
const updateTitleInput = document.getElementById("update-title-input");
const updateDateInput = document.getElementById("update-date-input");
const updateContentInput = document.getElementById("update-content-input");
const updateEventModal = document.getElementById("update-event-modal");
const updateEventForm = document.getElementById("update-event-form");
const updateEventCloseBtn = document.getElementById("update-event-close-btn");
const updateEventErrorMsg = document.getElementById(
    "update-event-error-message"
);
const reg = new RegExp("^[a-zA-Z0-9 .,@-]+$");

async function getEvent(id) {
    try {
        const response = await fetch(`/api/v1/events/${id}`);
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        updateEventForm.dataset.id = data._id;
        updateTitleInput.value = data.title;
        updateDateInput.value = data.date;
        updateContentInput.textContent = data.content;
        updateEventModal.showModal();
    } catch (err) {
        console.error(err);
    }
}

async function getAllEvents() {
    try {
        eventsSection.replaceChildren();
        const response = await fetch("/api/v1/events");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        data.forEach((event) => {
            const eventContainer = document.createElement("div");
            eventContainer.classList.add("event-container");
            eventsSection.append(eventContainer);
            const eventTitle = document.createElement("h3");
            eventTitle.textContent = event.title;
            eventTitle.classList.add("event-title");
            eventContainer.append(eventTitle);
            const btnContainer = document.createElement("div");
            btnContainer.classList.add("button-container");
            eventContainer.append(btnContainer);
            const updateEventBtn = document.createElement("button");
            updateEventBtn.textContent = "Update";
            updateEventBtn.classList.add("form-button");
            updateEventBtn.addEventListener("click", () => {
                getEvent(event._id);
            });
            btnContainer.append(updateEventBtn);
            const deleteEventBtn = document.createElement("button");
            deleteEventBtn.textContent = "Delete";
            deleteEventBtn.classList.add("form-button");
            deleteEventBtn.addEventListener("click", () => {
                deleteEvent(event._id);
            });
            btnContainer.append(deleteEventBtn);
        });
    } catch (err) {
        console.error(err);
    }
}

async function createEvent(e) {
    try {
        e.preventDefault();
        contentInput.textContent = contentInput.textContent.trim();
        if (
            !reg.test(titleInput.value) ||
            !reg.test(dateInput.value) ||
            !reg.test(contentInput.value)
        ) {
            throw new Error(
                "Validation Error: Please do not include special characters in your input"
            );
        }
        const eventData = {
            title: titleInput.value,
            date: dateInput.value,
            content: contentInput.value,
        };
        const response = await fetch("/api/v1/events", {
            method: "POST",
            body: JSON.stringify(eventData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            addEventForm.reset();
            getAllEvents();
        }
    } catch (err) {
        console.error(err);
        addEventErrorMsg.textContent = err.message;
    }
}

async function updateEvent(id) {
    try {
        updateContentInput.textContent = updateContentInput.textContent.trim();
        if (
            !reg.test(updateTitleInput.value) ||
            !reg.test(updateDateInput.value) ||
            !reg.test(updateContentInput.value)
        ) {
            throw new Error(
                "Validation Error: Please do not include special characters in your input"
            );
        }
        const eventData = {
            title: updateTitleInput.value,
            date: updateDateInput.value,
            content: updateContentInput.value,
        };
        const response = await fetch(`/api/v1/events/${id}`, {
            method: "PATCH",
            body: JSON.stringify(eventData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        } else {
            const data = await response.json();
            console.log(data.msg);
            updateEventForm.reset();
            updateEventModal.close();
            getAllEvents();
        }
    } catch (err) {
        console.error(err);
        updateEventErrorMsg.textContent = err.message;
    }
}

async function deleteEvent(id) {
    try {
        const response = await fetch(`/api/v1/events/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error getting schedule data: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.msg);
        getAllEvents();
    } catch (err) {
        console.error(err);
    }
}

usernameText.textContent = `User: ${sessionStorage.getItem("username")}`;

updateEventCloseBtn.addEventListener("click", () => {
    updateEventModal.close();
});
addEventForm.addEventListener("submit", createEvent);
updateEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateEvent(updateEventForm.dataset.id);
});
getAllEvents();
