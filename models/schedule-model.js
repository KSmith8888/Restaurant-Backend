import mongoose from "mongoose";
const { Schema, model } = mongoose;

const scheduleSchema = new Schema({
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
    schedule: {
        type: Array,
        required: true,
    },
});

const Schedule = model("Schedule", scheduleSchema);

export { Schedule };
