import express from "express";

import {
    createAccount,
    loginAttempt,
} from "../controllers/login-controller.js";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser } from "../middleware/authorize.js";

const loginRouter = express.Router();

loginRouter.post("/", sanitizeChars, loginAttempt);
loginRouter.post("/create", sanitizeChars, authorizeUser, createAccount);

export { loginRouter };
