import { Event } from "../models/event-model.js";
import { wrapper } from "../middleware/wrapper.js";

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

export { getAllEvents, createEvent };
