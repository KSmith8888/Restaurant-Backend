import bcrypt from "bcrypt";

import { User } from "../models/user-model.js";

const createAccount = async (req, res) => {
    try {
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
        res.status(200);
        res.json({
            msg: "New user created successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

const getUser = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.userId) {
            throw new Error("User id not applied from token");
        }
        const paramId = req.params.id;
        const requestedUser = await User.findOne({ _id: paramId });
        res.status(200);
        res.json(requestedUser);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        if (!req.userId) {
            throw new Error("User id not applied from token");
        }
        const paramId = req.params.id;
        await User.findOneAndDelete({ _id: paramId });
        res.status(200);
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { createAccount, getAllUsers, getUser, deleteUser };
