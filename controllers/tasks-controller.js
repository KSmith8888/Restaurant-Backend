//import { TaskList } from "../models/task-list-model.js";
//import { User } from "../models/user-model.js";

const createTaskList = (req, res) => {
    try {
        console.log("Task list created successfully");
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

export { createTaskList };
