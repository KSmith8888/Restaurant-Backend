import express from "express";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser, authorizeAdmin } from "../middleware/authorize.js";
import { createAccount } from "../controllers/register-controller.js";

const registerRouter = express.Router();

registerRouter.post(
    "/",
    sanitizeChars,
    authorizeUser,
    authorizeAdmin,
    createAccount
);

export { registerRouter };
