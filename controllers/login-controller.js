import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

const createAccount = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Strict-Transport-Security", "max-age=6000");
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            throw new Error("Credentials not provided");
        } else {
            const userInfo = {
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin ? true : false,
            };
            const dbUser = await User.create(userInfo);
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
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Strict-Transport-Security", "max-age=6000");
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
        res.json({ status: "success", token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const optionsPreflight = (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Strict-Transport-Security", "max-age=6000");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", [
            "content-type",
            "authorization",
        ]);
        res.status(200);
        res.json({ msg: "Preflight Passed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { optionsPreflight, loginAttempt, createAccount };
