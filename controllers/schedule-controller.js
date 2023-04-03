import { Schedule } from "../models/schedule-model.js";
import { User } from "../models/user-model.js";
import { wrapper } from "../middleware/wrapper.js";

const getSchedule = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const paramId = req.params.id;
    if (!req.userId || paramId !== req.userId) {
        throw new Error("User id not applied from token");
    }
    const requestedSchedule = await Schedule.findOne({
        user_id: String(paramId),
    });
    if (!requestedSchedule) {
        throw new Error("Not Found Error: No schedule with that id");
    }
    res.status(200);
    res.json(requestedSchedule);
});

const getAllSchedules = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.admin) {
        throw new Error("User not authorized for this route");
    }
    const allSchedules = await Schedule.find();
    res.status(200);
    res.json(allSchedules);
});

const createSchedule = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.admin) {
        throw new Error("User not authorized for this route");
    }
    const scheduleName = req.body.name;
    const scheduleData = req.body.scheduleInfo;
    if (!scheduleName || !scheduleData) {
        throw new Error("Bad Request Error: No schedule data provided");
    }
    const dbUser = await User.findOne({ username: String(scheduleName) });
    if (!dbUser) {
        throw new Error("Not Found Error: No database user with that id");
    }
    const newSchedule = {
        user_id: dbUser._id,
        name: dbUser.username,
        schedule: scheduleData,
    };
    await Schedule.create(newSchedule);
    res.status(200);
    res.json({ msg: "Item created successfully" });
});

const updateSchedule = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.userId) {
        throw new Error("User id not applied from token");
    }
    const paramId = req.params.id;
    const requestedSchedule = await Schedule.findOne({
        user_id: String(paramId),
    });
    if (!requestedSchedule) {
        throw new Error("Not Found Error: No schedule with that id");
    }
    const scheduleData = req.body;
    if (!scheduleData || typeof scheduleData !== "object") {
        throw new Error("Bad Request Error: No schedule data provided");
    }
    await Schedule.findOneAndUpdate(
        { user_id: paramId },
        {
            $set: {
                schedule: scheduleData,
            },
        }
    );
    res.status(200);
    res.json({ msg: "Schedule updated successfully" });
});

const deleteSchedule = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.userId) {
        throw new Error("User id not applied from token");
    }
    const paramId = req.params.id;
    await Schedule.findOneAndDelete({ user_id: paramId });
    res.status(200);
    res.json({ msg: "Schedule deleted successfully" });
});

export {
    getSchedule,
    getAllSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};
