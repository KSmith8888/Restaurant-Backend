import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    getEvent,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    optionsPreflight,
} from "../controllers/events-controller.js";

const eventsRouter = express.Router();

eventsRouter.get(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    getEvent
);
eventsRouter.get("/", sanitizeChars, getAllEvents);
eventsRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createEvent
);
eventsRouter.patch(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    updateEvent
);
eventsRouter.delete("/:id", sanitizeChars, deleteEvent);
eventsRouter.options("/", optionsPreflight);

export { eventsRouter };
