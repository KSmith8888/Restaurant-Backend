const addEventForm = document.getElementById("add-event-form");
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const dateInput = document.getElementById("date-input");
const usernameText = document.getElementById("username-text");
const eventsSection = document.getElementById("events-section");
const addEventErrorMsg = document.getElementById("add-event-error-message");
const reg = new RegExp("^[a-zA-Z0-9 .@-]+$");

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
                updateEvent(event._id);
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
        console.log(id, "update");
    } catch (err) {
        console.error(err);
    }
}

async function deleteEvent(id) {
    try {
        console.log(id, "delete");
    } catch (err) {
        console.error(err);
    }
}

usernameText.textContent = `User: ${sessionStorage.getItem("username")}`;

addEventForm.addEventListener("submit", createEvent);
getAllEvents();
