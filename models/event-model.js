import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 180,
        trim: true,
    },
});

const Event = model("Event", eventSchema);

export { Event };
