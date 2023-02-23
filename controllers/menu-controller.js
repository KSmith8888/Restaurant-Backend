let cacheData = [];

const getAllMenuItems = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET", "OPTIONS");
    res.status(200);
    res.json(cacheData);
};

const getMenuItem = (req, res) => {
    const paramId = req.params.id;
    const requestedItem = cacheData.find((menuItem) => {
        return menuItem.id.toString() === paramId;
    });
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET", "OPTIONS");
    res.status(200);
    res.json(requestedItem);
};

const createMenuItem = (req, res) => {
    let newItem = req.body;
    newItem.id = cacheData.length + 1;
    newItem.path = req.filepath;
    if (newItem.highlight) {
        newItem.highlight = true;
    } else {
        newItem.highlight = false;
    }
    cacheData.push(newItem);
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "POST", "OPTIONS");
    res.status(200);
    res.json({ msg: "got it" });
};

const updateMenuItem = (req, res) => {
    const updateInfo = req.body;
    const paramId = req.params.id;
    const requestedItem = cacheData.find((menuItem) => {
        return menuItem.id.toString() === paramId;
    });
    if (updateInfo.name) {
        requestedItem.name = updateInfo.name;
    }
    if (updateInfo.price) {
        requestedItem.price = updateInfo.price;
    }
    if (updateInfo.description) {
        requestedItem.description = updateInfo.description;
    }
    if (req.filepath) {
        requestedItem.path = req.filepath;
    }
    if (updateInfo.alt) {
        requestedItem.alt = updateInfo.alt;
    }
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "PATCH", "OPTIONS");
    res.status(200);
    res.json(requestedItem);
};

const deleteMenuItem = (req, res) => {
    console.log(cacheData);
    const paramId = req.params.id;
    let removeIndex;
    const requestedItem = cacheData.find((menuItem, index) => {
        removeIndex = index;
        return menuItem.id.toString() === paramId;
    });
    cacheData.splice(removeIndex, 1);
    console.log(cacheData);
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "DELETE", "OPTIONS");
    res.status(200);
    res.json({ msg: "Menu Item Deleted" });
};

const optionsPreflight = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.status(200);
    res.json({ msg: "Preflight Passed" });
};

export {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
};
