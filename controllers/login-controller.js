import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user-model.js";

const createAccount = async (req, res) => {
    try {
        res.header("Strict-Transport-Security", "max-age=60000");
        const username = req.body.username;
        const password = req.body.password;
        const isAdmin = req.body.admin ? true : false;
        if (!username || !password) {
            throw new Error("Credentials not provided");
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const userInfo = {
                username: username,
                password: hashedPassword,
                admin: isAdmin,
            };
            const dbUser = await User.create(userInfo);
            res.status(200);
            res.json({
                msg: "New user created successfully",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({
            msg: "There has been an error, please try again later",
        });
    }
};

const loginAttempt = async (req, res) => {
    try {
        res.header("Strict-Transport-Security", "max-age=60000");
        const paramUsername = req.body.username;
        const paramPassword = req.body.password;
        if (!paramUsername || !paramPassword) {
            throw new Error(
                "Credential Error: Username or password not provided"
            );
        }
        const dbUser = await User.findOne({ username: paramUsername });
        if (!dbUser) {
            throw new Error(
                "Credential Error: No database user found with provided username"
            );
        }
        const hashedPassword = await bcrypt.compare(
            paramPassword,
            dbUser.password
        );
        console.log(hashedPassword);
        if (!hashedPassword) {
            throw new Error(
                "Credential Error: Provided password does not match stored hash"
            );
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
        res.json({ msg: "Logged in successfully" });
    } catch (err) {
        console.error(err);
        if (err.message.startsWith("Credential Error:")) {
            res.status(401);
            res.json({
                msg: "Provided credentials do not match",
            });
        } else {
            res.status(500);
            res.json({
                msg: "There has been an error, please try again later",
            });
        }
    }
};

export { loginAttempt, createAccount };
