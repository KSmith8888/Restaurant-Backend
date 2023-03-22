import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

const User = model("User", userSchema);

export { User };
