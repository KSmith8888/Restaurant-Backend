import express from "express";

import {
    optionsPreflight,
    loginAttempt,
} from "../controllers/login-controller.js";

const loginRouter = express.Router();

loginRouter.options("/", optionsPreflight);
loginRouter.post("/", loginAttempt);

export { loginRouter };
