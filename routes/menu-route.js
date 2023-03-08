import express from "express";
import multer from "multer";

import { storage } from "../middleware/multer.js";

const upload = multer({ storage: storage });

import {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
} from "../controllers/menu-controller.js";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser } from "../middleware/authorize.js";

const menuRouter = express.Router();

menuRouter.options("/", optionsPreflight);
menuRouter.options("/:id", optionsPreflight);
menuRouter.get("/", getAllMenuItems);
menuRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    upload.single("image"),
    createMenuItem
);
menuRouter.delete("/:id", sanitizeChars, authorizeUser, deleteMenuItem);
menuRouter.get("/:id", sanitizeChars, authorizeUser, getMenuItem);
menuRouter.patch(
    "/:id",
    sanitizeChars,
    authorizeUser,
    upload.single("image"),
    updateMenuItem
);

export { menuRouter };
