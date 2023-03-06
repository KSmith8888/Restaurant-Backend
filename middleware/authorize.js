import jwt from "jsonwebtoken";

import { User } from "../models/user-model.js";

async function authorizeUser(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw new Error(
                "Authentication failed, proper credentials are not present"
            );
        }
        if (!req.headers.authorization.startsWith("Bearer ")) {
            throw new Error("Invalid token format");
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedClient = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedClient.id;
        const dbUser = await User.findOne({ _id: id });
        if (!dbUser) {
            throw new Error("Provided credentials do not match");
        }
        if (!dbUser.admin) {
            throw new Error("User does not have access to this route");
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({
            msg: "Provided credentials do not match",
        });
    }
}

export { authorizeUser };
