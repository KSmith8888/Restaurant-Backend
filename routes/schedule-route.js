import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    getSchedule,
    getAllSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} from "../controllers/schedule-controller.js";

const scheduleRouter = express.Router();

scheduleRouter.get("/", authorizeUser, authorizeAdmin, getAllSchedules);
scheduleRouter.get("/:id", authorizeUser, getSchedule);
scheduleRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createSchedule
);
scheduleRouter.patch(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    updateSchedule
);
scheduleRouter.delete("/:id", authorizeUser, authorizeAdmin, deleteSchedule);

export { scheduleRouter };
