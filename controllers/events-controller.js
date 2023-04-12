import { Event } from "../models/event-model.js";
import { wrapper } from "../middleware/wrapper.js";

const getEvent = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    if (!paramId) {
        throw new Error("User id not present");
    }
    const requestedEvent = await Event.findOne({
        _id: String(paramId),
    });
    if (!requestedEvent) {
        throw new Error("Not Found Error: No event with that id");
    }
    res.status(200);
    res.json(requestedEvent);
});

const getAllEvents = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const allEvents = await Event.find();
    const responseEventData = allEvents.map((user) => {
        return {
            _id: user._id,
            title: user.title,
            date: user.date,
            content: user.content,
        };
    });
    res.status(200);
    res.json(responseEventData);
});

const createEvent = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const newItem = req.body;
    if (!newItem) {
        throw new Error("Event data is not present");
    }
    await Event.create(newItem);
    res.status(201);
    res.json({ msg: "Event created successfully" });
});

const updateEvent = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    if (!paramId) {
        throw new Error("No user Id provided");
    }
    const requestedEvent = await Event.findOne({
        _id: String(paramId),
    });
    if (!requestedEvent) {
        throw new Error("Not Found Error: No event with that id");
    }
    const eventData = req.body;
    if (!eventData || typeof eventData !== "object") {
        throw new Error("Bad Request Error: No schedule data provided");
    }
    if (!eventData.title) {
        eventData.title = requestedEvent.title;
    }
    if (!eventData.date) {
        eventData.date = requestedEvent.date;
    }
    if (!eventData.content) {
        eventData.content = requestedEvent.content;
    }
    await Event.findOneAndUpdate(
        { _id: paramId },
        {
            $set: {
                title: eventData.title,
                date: eventData.date,
                content: eventData.content,
            },
        }
    );
    res.status(200);
    res.json({ msg: "Event updated successfully" });
});

const deleteEvent = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    if (!paramId) {
        throw new Error("User id not present");
    }
    await Event.findOneAndDelete({ _id: paramId });
    res.status(200);
    res.json({ msg: "Event deleted successfully" });
});

const optionsPreflight = wrapper((req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    res.header("Access-Control-Allow-Methods", "GET");
    res.status(200);
    res.json({ msg: "Preflight Passed" });
});

export {
    getEvent,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    optionsPreflight,
};
