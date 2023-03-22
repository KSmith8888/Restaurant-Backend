import mongoose from "mongoose";

const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 180,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 7,
    },
    alt: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
    },
    highlight: {
        type: Boolean,
        default: false,
    },
    path: {
        type: String,
        required: true,
    },
});

const MenuItem = model("MenuItem", menuItemSchema);

export { MenuItem };
