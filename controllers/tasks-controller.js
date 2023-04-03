import { TaskList } from "../models/task-list-model.js";
import { User } from "../models/user-model.js";
import { wrapper } from "../middleware/wrapper.js";

const getUserTaskList = wrapper(async (req, res) => {
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
    if (!requestedTasks) {
        throw new Error("Not Found Error: No task list with that id");
    }
    res.status(200);
    res.json(requestedTasks);
});

const getAllTaskLists = wrapper(async (req, res) => {
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
});

const createTaskList = wrapper(async (req, res) => {
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
        throw new Error("Bad Request Error: No username or task list provided");
    }
    const dbUser = await User.findOne({ username: String(taskName) });
    if (!dbUser) {
        throw new Error("Not Found Error: No database user with that id");
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
});

const updateUserTaskList = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.userId) {
        throw new Error("User id not applied from token");
    }
    const paramId = req.params.id;
    const requestedTaskList = await TaskList.findOne({
        user_id: String(paramId),
    });
    if (!requestedTaskList) {
        throw new Error("Not Found Error: No task list with that id");
    }
    const taskData = req.body;
    if (!taskData) {
        throw new Error("Bad Request Error: No task data provided");
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
});

const deleteUserTaskList = wrapper(async (req, res) => {
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
});

export {
    getUserTaskList,
    getAllTaskLists,
    createTaskList,
    updateUserTaskList,
    deleteUserTaskList,
};
