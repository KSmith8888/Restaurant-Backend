<<<<<<< HEAD
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
=======
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
>>>>>>> 139e8535032b2900136cc223ec17dc41b135da43
