import express from "express";

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
scheduleRouter.post("/", authorizeUser, authorizeAdmin, createSchedule);
scheduleRouter.patch("/:id", authorizeUser, authorizeAdmin, updateSchedule);
scheduleRouter.delete("/:id", authorizeUser, authorizeAdmin, deleteSchedule);

export { scheduleRouter };
