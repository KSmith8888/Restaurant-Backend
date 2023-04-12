import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import { getAllEvents, createEvent } from "../controllers/events-controller.js";

const eventsRouter = express.Router();

eventsRouter.get("/", sanitizeChars, getAllEvents);
eventsRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createEvent
);

export { eventsRouter };
