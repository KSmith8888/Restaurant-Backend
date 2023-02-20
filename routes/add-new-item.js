import express from "express";

const addNewItem = express.Router();

let cacheData = [];

const postItem = async (req, res) => {
    let newItem = req.body;
    newItem.id = cacheData.length + 1;
    newItem.path = req.filepath;
    if (newItem.highlight) {
        newItem.highlight = true;
    } else {
        newItem.highlight = false;
    }
    cacheData.push(newItem);
    console.log(cacheData);
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "POST", "OPTIONS");
    res.status(200);
    res.json({ msg: "got it" });
};

addNewItem.post("/", postItem);

export { addNewItem, cacheData };
