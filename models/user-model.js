<<<<<<< HEAD
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
=======
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

const User = model("User", userSchema);

export { User };
>>>>>>> 139e8535032b2900136cc223ec17dc41b135da43
