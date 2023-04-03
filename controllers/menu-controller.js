import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { MenuItem } from "../models/menu-item-model.js";
import { wrapper } from "../middleware/wrapper.js";

const fileName = fileURLToPath(import.meta.url);
const cwd = path.dirname(fileName);
const rootDirectory = path.dirname(cwd);

const getAllMenuItems = wrapper(async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const allMenuItems = await MenuItem.find();
    res.status(200);
    res.json(allMenuItems);
});

const getMenuItem = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    const requestedItem = await MenuItem.findOne({ _id: paramId });
    if (!requestedItem) {
        throw new Error("Not Found Error: No menu item with that id");
    }
    res.status(200);
    res.json(requestedItem);
});

const createMenuItem = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const newItem = req.body;
    if (!req.filepath) {
        throw new Error("No image file path found");
    }
    newItem.path = req.filepath;
    if (newItem.highlight) {
        newItem.highlight = true;
    } else {
        newItem.highlight = false;
    }
    await MenuItem.create(newItem);
    res.status(201);
    res.json({ msg: "Item created successfully" });
});

const updateMenuItem = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const updateInfo = req.body;
    const paramId = req.params.id;
    const requestedItem = await MenuItem.findOne({ _id: paramId });
    if (!requestedItem) {
        throw new Error("Not Found Error: No menu item with that id");
    }
    if (!updateInfo.name) {
        updateInfo.name = requestedItem.name;
    }
    if (!updateInfo.price) {
        updateInfo.price = requestedItem.price;
    }
    if (!updateInfo.description) {
        updateInfo.description = requestedItem.description;
    }
    /*
    If a new file was uploaded as part of the update, use the newly uploaded image file name for the path property, otherwise keep the old path
    */
    if (req.filepath) {
        updateInfo.path = req.filepath;
    } else {
        updateInfo.path = requestedItem.filepath;
    }
    if (!updateInfo.alt) {
        updateInfo.alt = requestedItem.alt;
    }
    if (!updateInfo.highlight) {
        updateInfo.highlight = false;
    } else {
        updateInfo.highlight = true;
    }
    updateInfo._id = requestedItem._id;
    updateInfo.__v = requestedItem.__v;
    await MenuItem.findOneAndReplace({ _id: paramId }, updateInfo);
    res.status(200);
    res.json({ msg: "Item updated successfully" });
});

const deleteMenuItem = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    const itemToBeDeleted = await MenuItem.findOne({ _id: paramId });
    if (!itemToBeDeleted) {
        throw new Error("Not Found Error: No menu item with that id");
    }
    const pathArray = itemToBeDeleted.path.split("uploads");
    fs.unlink(`${rootDirectory}/public/uploads${pathArray[1]}`, (err) => {
        if (err) {
            throw new Error(`Error deleting file: ${err}`);
        }
    });
    await MenuItem.findOneAndDelete({ _id: paramId });
    res.status(200);
    res.json({ msg: "Item deleted successfully" });
});

const optionsPreflight = wrapper((req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    res.header("Access-Control-Allow-Methods", "GET");
    res.status(200);
    res.json({ msg: "Preflight Passed" });
});

export {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
};
