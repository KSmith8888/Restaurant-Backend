import express from "express";

import {
    optionsPreflight,
    createAccount,
    loginAttempt,
} from "../controllers/login-controller.js";

import { sanitizeChars } from "../middleware/sanitize.js";
import { authorizeUser } from "../middleware/authorize.js";

const loginRouter = express.Router();

loginRouter.options("/", optionsPreflight);
loginRouter.options("/create", optionsPreflight);
loginRouter.post("/", sanitizeChars, loginAttempt);
loginRouter.post("/create", sanitizeChars, authorizeUser, createAccount);

export { loginRouter };
