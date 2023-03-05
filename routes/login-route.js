import express from "express";

import {
    optionsPreflight,
    createAccount,
    loginAttempt,
} from "../controllers/login-controller.js";

import { sanitizeChars } from "../middleware/sanitize.js";

const loginRouter = express.Router();

loginRouter.options("/", optionsPreflight);
loginRouter.options("/create", optionsPreflight);
loginRouter.post("/", sanitizeChars, loginAttempt);
loginRouter.post("/create", sanitizeChars, createAccount);

export { loginRouter };
