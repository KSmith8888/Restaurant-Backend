import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

let adminToken;

const createAccount = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Strict-Transport-Security", "max-age=6000");
        if (!req.body.username || !req.body.password) {
            throw new Error("Credentials not provided");
        } else {
            const userInfo = {
                username: req.body.username,
                password: req.body.password,
            };
            const dbUser = await User.create(userInfo);
            const token = jwt.sign(
                { id: dbUser._id, username: dbUser.username },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );
            adminToken = token;
            res.status(200).json({ status: "success", token: token });
        }
    } catch (error) {
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
        if (
            !req.headers.authorization ||
            !req.body.username ||
            !req.body.password
        ) {
            throw new Error(
                "Authentication failed, proper credentials are not present"
            );
        }
        if (!req.headers.authorization.includes("Bearer ")) {
            throw new Error("Invalid token format");
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedClient = jwt.verify(token, process.env.JWT_SECRET);
        const decodedSaved = jwt.verify(adminToken, process.env.JWT_SECRET);
        const id = decodedClient.id;
        const dbUser = await User.findOne({ _id: id });
        if (
            !dbUser ||
            dbUser.username !== req.body.username ||
            decodedClient.username !== decodedSaved.username ||
            decodedClient.id !== decodedSaved.id ||
            dbUser.username !== decodedClient.username
        ) {
            throw new Error("Provided credentials do not match");
        } else {
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
