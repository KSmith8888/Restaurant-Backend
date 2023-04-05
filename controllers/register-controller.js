import bcrypt from "bcrypt";

import { User } from "../models/user-model.js";
import { Schedule } from "../models/schedule-model.js";
import { TaskList } from "../models/task-list-model.js";
import { wrapper } from "../middleware/wrapper.js";

const createAccount = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = req.body.admin ? true : false;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userInfo = {
        username: username,
        password: hashedPassword,
        admin: isAdmin,
    };
    await User.create(userInfo);
    res.status(201);
    res.json({
        msg: "New user created successfully",
    });
});

const getAllUsers = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    const allUsers = await User.find();
    const responseUserData = allUsers.map((user) => {
        return {
            _id: user._id,
            username: user.username,
            admin: user.admin,
        };
    });
    res.status(200);
    res.json(responseUserData);
});

const updateUserRole = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.userId) {
        throw new Error("User id not applied from token");
    }
    const paramId = req.params.id;
    const dbUser = await User.findOne({
        _id: String(paramId),
    });
    if (!dbUser) {
        throw new Error("Not Found Error: No user with that id");
    }
    const newName = req.body.name ? req.body.name : dbUser.username;
    const newRole = req.body.role === "Admin" ? true : false;
    await User.findByIdAndUpdate(
        {
            _id: paramId,
        },
        {
            $set: {
                username: newName,
                admin: newRole,
            },
        }
    );
    res.status(200);
    res.json({ msg: "User info updated successfully" });
});

const deleteUser = wrapper(async (req, res) => {
    res.header(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );
    if (!req.userId) {
        throw new Error("User id not applied from token");
    }
    const paramId = req.params.id;
    if (req.userId !== paramId) {
        await User.findOneAndDelete({ _id: String(paramId) });
        await Schedule.findOneAndDelete({ user_id: String(paramId) });
        await TaskList.findOneAndDelete({ user_id: String(paramId) });
        res.status(200);
        res.json({ msg: "User data deleted successfully" });
    } else {
        throw new Error("You cannot delete your own account");
    }
});

export { createAccount, getAllUsers, updateUserRole, deleteUser };
