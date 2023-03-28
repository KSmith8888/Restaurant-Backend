import express from "express";
import multer from "multer";

import { multStorage, multFilter } from "../middleware/multer.js";

const upload = multer({ storage: multStorage, fileFilter: multFilter });

import {
    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    optionsPreflight,
} from "../controllers/menu-controller.js";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";

const menuRouter = express.Router();

menuRouter.options("/", optionsPreflight);
menuRouter.get("/", getAllMenuItems);
menuRouter.post(
    "/",
    upload.single("image"),
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createMenuItem
);
menuRouter.delete(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    deleteMenuItem
);
menuRouter.get(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    getMenuItem
);
menuRouter.patch(
    "/:id",
    upload.single("image"),
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    updateMenuItem
);

export { menuRouter };
