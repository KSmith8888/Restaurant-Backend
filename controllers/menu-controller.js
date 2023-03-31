import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { MenuItem } from "../models/menu-item-model.js";

const fileName = fileURLToPath(import.meta.url);
const cwd = path.dirname(fileName);
const rootDirectory = path.dirname(cwd);

const getAllMenuItems = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const allMenuItems = await MenuItem.find();
        res.status(200);
        res.json(allMenuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const getMenuItem = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const paramId = req.params.id;
        const requestedItem = await MenuItem.findOne({ _id: paramId });
        if (requestedItem) {
            res.status(200);
            res.json(requestedItem);
        } else {
            res.status(404);
            res.json({ msg: "Item not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const createMenuItem = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const updateInfo = req.body;
        const paramId = req.params.id;
        const requestedItem = await MenuItem.findOne({ _id: paramId });
        if (!requestedItem) {
            return res.status(404).json({ msg: "Item not found" });
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const paramId = req.params.id;
        const itemToBeDeleted = await MenuItem.findOne({ _id: paramId });
        if (!itemToBeDeleted) {
            throw new Error("No menu item found with that id");
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const optionsPreflight = (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        res.header("Access-Control-Allow-Methods", "GET");
        res.status(200);
        res.json({ msg: "Preflight Passed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
};
