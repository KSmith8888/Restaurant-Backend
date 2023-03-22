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
        const dbUser = await User.create(userInfo);
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

export { createAccount };
