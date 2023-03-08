import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

const createAccount = async (req, res) => {
    try {
        res.header("Strict-Transport-Security", "max-age=60000");
        if (!req.body.username || !req.body.password) {
            throw new Error("Credentials not provided");
        } else {
            const userInfo = {
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin ? true : false,
            };
            const dbUser = await User.create(userInfo);
            res.status(200);
            res.json({ status: "success" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const loginAttempt = async (req, res) => {
    try {
        res.header("Strict-Transport-Security", "max-age=60000");
        if (!req.body.username || !req.body.password) {
            throw new Error("Credentials not provided");
        }
        const dbUser = await User.findOne({ username: req.body.username });
        if (
            !dbUser ||
            dbUser.username !== req.body.username ||
            dbUser.password !== req.body.password
        ) {
            throw new Error("Provided credentials do not match");
        }
        const token = jwt.sign(
            {
                id: dbUser._id,
                username: dbUser.username,
                admin: dbUser.admin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.status(200);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1800000,
        });
        res.json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { loginAttempt, createAccount };
