import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import { createTaskList } from "../controllers/tasks-controller.js";

const tasksRouter = express.Router();

tasksRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createTaskList
);

export { tasksRouter };
