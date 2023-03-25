import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

async function authorizeUser(req, res, next) {
    try {
        const cookies = req.headers.cookie;
        if (!cookies) {
            throw new Error("Credential Error: No cookies present in request");
        }
        //const cookiesArray = cookies.split(";");
        //console.log(cookiesArray, cookiesArray.length);
        const cookieName = req.headers.cookie.split("=")[0];
        if (cookieName !== "token") {
            throw new Error(
                "Credential Error: Token cookie not present in request"
            );
        }
        const token = req.headers.cookie.split("=")[1];
        const decodedClient = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedClient.id;
        const dbUser = await User.findOne({ _id: id });
        if (!dbUser) {
            throw new Error(
                "Credential Error: No matching database user found"
            );
        }
        req.userId = decodedClient.id;
        if (dbUser.admin) {
            req.admin = true;
        }
        next();
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
}

function authorizeAdmin(req, res, next) {
    try {
        let exception;
        if (
            req.path.includes("/schedule") ||
            req.path.includes("/tasks") ||
            req.path.includes("all-pages") ||
            req.path.includes("/logout-user")
        ) {
            exception = true;
        }
        if (!req.admin && !exception) {
            throw new Error(
                "Credential Error: User does not have access to this route"
            );
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(403);
        res.json({ msg: "Access denied" });
    }
}

export { authorizeUser, authorizeAdmin };
