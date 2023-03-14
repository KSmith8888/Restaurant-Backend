import { Schedule } from "../models/schedule-model.js";

const getSchedule = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const paramId = req.params.id;
        const requestedItem = await Schedule.findOne({ _id: paramId });
        if (requestedItem) {
            res.status(200);
            res.json(requestedItem);
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
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const allMenuItems = await Schedule.find();
        res.status(200);
        res.json(allMenuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { getSchedule, getAllSchedules };
