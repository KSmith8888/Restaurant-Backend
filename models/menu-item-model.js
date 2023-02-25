import mongoose from "mongoose";
const { Schema, model } = mongoose;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    alt: {
        type: String,
        required: true,
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
