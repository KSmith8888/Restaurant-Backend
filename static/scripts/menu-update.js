const addMenuItemForm = document.getElementById("add-menu-item-form");
const currentMenuSection = document.getElementById("current-menu-section");
const updateMenuItemModal = document.getElementById("update-menu-item-modal");
const closeMenuModalBtn = document.getElementById("close-menu-modal-button");
const updateMenuItemForm = document.getElementById("update-menu-item-form");
const updateNameInput = document.getElementById("update-name-input");
const updatePriceInput = document.getElementById("update-price-input");
const updateDescriptionInput = document.getElementById(
    "update-description-input"
);
const logoutBtn = document.getElementById("logout-button");

async function createMenuItem(e) {
    e.preventDefault();
    const form = e.target;
    const newItemData = new FormData(form);
    try {
        const response = await fetch("/api/v1/menu", {
            method: "POST",
            body: newItemData,
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        addMenuItemForm.reset();
        console.log(data);
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.prepend(errorMessage);
    }
}

async function getMenuItem(id) {
    try {
        const response = await fetch(`/api/v1/menu/${id}`);
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        updateNameInput.value = data.name;
        updatePriceInput.value = data.price;
        updateDescriptionInput.textContent = data.description;
        updateMenuItemForm.dataset.id = id;
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.prepend(errorMessage);
    }
}

async function getAllMenuItems() {
    currentMenuSection.replaceChildren();
    const currentMenuHeading = document.createElement("h2");
    currentMenuHeading.classList.add("current-menu-heading");
    currentMenuHeading.textContent = "Current Menu Items:";
    currentMenuSection.append(currentMenuHeading);
    try {
        const response = await fetch("/api/v1/menu");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        data.forEach((item) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("menu-item-container");
            currentMenuSection.append(itemContainer);
            const itemDetails = document.createElement("p");
            itemDetails.classList.add("item-details");
            itemDetails.textContent = item.name;
            itemContainer.append(itemDetails);
            const updateItemBtn = document.createElement("button");
            updateItemBtn.classList.add("update-item-button");
            updateItemBtn.textContent = "Update Item";
            itemContainer.append(updateItemBtn);
            updateItemBtn.addEventListener("click", () => {
                updateMenuItemModal.showModal();
                getMenuItem(item._id);
            });
            const deleteItemBtn = document.createElement("button");
            deleteItemBtn.classList.add("delete-item-button");
            deleteItemBtn.textContent = "Delete Item";
            itemContainer.append(deleteItemBtn);
            deleteItemBtn.addEventListener("click", () => {
                deleteMenuItem(item._id);
            });
        });
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.prepend(errorMessage);
    }
}

async function updateMenuItem(e) {
    e.preventDefault();
    const id = updateMenuItemForm.dataset.id;
    const form = e.target;
    const newItemData = new FormData(form);
    try {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: "PATCH",
            body: newItemData,
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        updateMenuItemForm.reset();
        updateDescriptionInput.textContent = "";
        updateMenuItemModal.close();
        getAllMenuItems();
        console.log(data);
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.prepend(errorMessage);
    }
}

async function deleteMenuItem(id) {
    try {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        getAllMenuItems();
        console.log(data);
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.prepend(errorMessage);
    }
}

async function logoutUser() {
    try {
        const response = await fetch("/api/v1/logout");
        if (!response.ok) {
            throw new Error(`Logout did not complete: ${response.status}`);
        } else {
            location.href = "./manage-entry.html";
        }
    } catch (err) {
        console.error(err);
    }
}

addMenuItemForm.addEventListener("submit", createMenuItem);
updateMenuItemForm.addEventListener("submit", updateMenuItem);
closeMenuModalBtn.addEventListener("click", () => {
    updateMenuItemForm.reset();
    updateDescriptionInput.textContent = "";
    updateMenuItemModal.close();
});
logoutBtn.addEventListener("click", logoutUser);

getAllMenuItems();
