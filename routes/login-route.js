import express from "express";

import {
    optionsPreflight,
    createAccount,
    loginAttempt,
} from "../controllers/login-controller.js";

const loginRouter = express.Router();

loginRouter.options("/", optionsPreflight);
loginRouter.options("/create", optionsPreflight);
loginRouter.post("/", loginAttempt);
loginRouter.post("/create", createAccount);

export { loginRouter };
