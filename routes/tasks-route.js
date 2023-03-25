import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    getUserTasks,
    getAllTasks,
    createTaskList,
} from "../controllers/tasks-controller.js";

const tasksRouter = express.Router();

tasksRouter.get("/", authorizeUser, authorizeAdmin, getAllTasks);
tasksRouter.get("/:id", sanitizeChars, authorizeUser, getUserTasks);
tasksRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createTaskList
);

export { tasksRouter };
