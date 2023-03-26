import { TaskList } from "../models/task-list-model.js";
import { User } from "../models/user-model.js";

const getUserTaskList = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        const paramId = req.params.id;
        if (!req.userId || paramId !== req.userId) {
            throw new Error("User id not applied from token");
        }
        const requestedTasks = await TaskList.findOne({
            user_id: String(paramId),
        });
        if (requestedTasks) {
            res.status(200);
            res.json(requestedTasks);
        } else {
            res.status(404);
            res.json({ msg: "Tasks not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const getAllTaskLists = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.admin) {
            throw new Error("User not authorized for this route");
        }
        const allSchedules = await TaskList.find();
        res.status(200);
        res.json(allSchedules);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const createTaskList = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.admin) {
            throw new Error("User not authorized for this route");
        }
        const taskName = req.body.name;
        const taskData = req.body.taskInfo;
        if (!taskName || !taskData) {
            throw new Error("No username or task data provided");
        }
        const dbUser = await User.findOne({ username: String(taskName) });
        if (!dbUser) {
            throw new Error("No database user found with provided username");
        }
        const dbTaskList = await TaskList.findOne({
            name: String(taskName),
        });
        if (!dbTaskList) {
            const newTaskList = {
                user_id: dbUser._id,
                name: dbUser.username,
                task_list: taskData,
            };
            await TaskList.create(newTaskList);
        } else {
            await TaskList.findOneAndUpdate(
                { user_id: dbUser._id },
                {
                    $set: {
                        task_list: [...dbTaskList.task_list, ...taskData],
                    },
                }
            );
        }
        res.status(200);
        res.json({ msg: "Task list created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

const updateUserTaskList = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.userId) {
            throw new Error("User id not applied from token");
        }
        const paramId = req.params.id;
        const requestedSchedule = await TaskList.findOne({
            user_id: String(paramId),
        });
        if (!requestedSchedule) {
            throw new Error("No task list found");
        }
        const taskData = req.body.taskInfo;
        if (!taskData) {
            throw new Error("No task list provided");
        }
        await TaskList.findOneAndUpdate(
            { user_id: paramId },
            {
                $set: {
                    task_list: taskData,
                },
            }
        );
        res.status(200);
        res.json({ msg: "Task list updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const deleteUserTaskList = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.userId) {
            throw new Error("User id not applied from token");
        }
        const paramId = req.params.id;
        await TaskList.findOneAndDelete({ user_id: paramId });
        res.status(200);
        res.json({ msg: "Task list deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export {
    getUserTaskList,
    getAllTaskLists,
    createTaskList,
    updateUserTaskList,
    deleteUserTaskList,
};
