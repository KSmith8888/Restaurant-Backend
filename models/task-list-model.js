import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskListSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    task_list: {
        type: Array,
        required: true,
    },
});

const TaskList = model("TaskList", taskListSchema);

export { TaskList };
