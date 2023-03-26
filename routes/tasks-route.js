import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    getUserTaskList,
    getAllTaskLists,
    createTaskList,
    updateUserTaskList,
    deleteUserTaskList,
} from "../controllers/tasks-controller.js";

const tasksRouter = express.Router();

tasksRouter.get("/", authorizeUser, authorizeAdmin, getAllTaskLists);
tasksRouter.get("/:id", sanitizeChars, authorizeUser, getUserTaskList);
tasksRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createTaskList
);
tasksRouter.patch(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    updateUserTaskList
);
tasksRouter.delete("/:id", authorizeUser, authorizeAdmin, deleteUserTaskList);

export { tasksRouter };
