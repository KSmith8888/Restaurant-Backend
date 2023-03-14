import express from "express";

import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    getSchedule,
    getAllSchedules,
} from "../controllers/schedule-controller.js";

const scheduleRouter = express.Router();

scheduleRouter.get("/", authorizeUser, authorizeAdmin, getAllSchedules);
scheduleRouter.get("/:id", authorizeUser, getSchedule);

export { scheduleRouter };
