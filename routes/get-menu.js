import express from "express";

import { cacheData } from "./add-new-item.js";

const getMenu = express.Router();

const getAllItems = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "POST", "OPTIONS");
    res.status(200);
    res.json(cacheData);
};

getMenu.get("/", getAllItems);

export { getMenu };
