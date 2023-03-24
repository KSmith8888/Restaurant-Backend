import { Schedule } from "../models/schedule-model.js";
import { User } from "../models/user-model.js";

const getSchedule = async (req, res) => {
    try {
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
        if (requestedSchedule) {
            res.status(200);
            res.json(requestedSchedule);
        } else {
            res.status(404);
            res.json({ msg: "Item not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const getAllSchedules = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const createSchedule = async (req, res) => {
    try {
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
            throw new Error("No username or schedule provided");
        }
        const dbUser = await User.findOne({ username: String(scheduleName) });
        if (!dbUser) {
            throw new Error("No database user found with provided username");
        }
        const newSchedule = {
            user_id: dbUser._id,
            name: dbUser.username,
            schedule: scheduleData,
        };
        await Schedule.create(newSchedule);
        res.status(200);
        res.json({ msg: "Item created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const updateSchedule = async (req, res) => {
    try {
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
            throw new Error("No schedule found");
        }
        const scheduleData = req.body.scheduleInfo;
        if (!scheduleData || typeof scheduleData !== "object") {
            throw new Error("No username or schedule provided");
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const deleteSchedule = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export {
    getSchedule,
    getAllSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
};
