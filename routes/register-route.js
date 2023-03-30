import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import {
    createAccount,
    getAllUsers,
    updateUserRole,
    deleteUser,
} from "../controllers/register-controller.js";

const registerRouter = express.Router();

registerRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createAccount
);
registerRouter.get("/", authorizeUser, authorizeAdmin, getAllUsers);
registerRouter.patch(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    updateUserRole
);
registerRouter.delete(
    "/:id",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    deleteUser
);

export { registerRouter };
