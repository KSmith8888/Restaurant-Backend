import express from "express";

import {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
} from "../controllers/menu-controller.js";

const menuRouter = express.Router();

menuRouter.options("/", optionsPreflight);
menuRouter.options("/:id", optionsPreflight);
menuRouter.get("/", getAllMenuItems);
menuRouter.post("/", createMenuItem);
menuRouter.delete("/:id", deleteMenuItem);
menuRouter.get("/:id", getMenuItem);
menuRouter.patch("/:id", updateMenuItem);

export { menuRouter };
