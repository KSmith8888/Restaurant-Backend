import express from "express";

import { loginAttempt } from "../controllers/login-controller.js";
import { sanitizeChars } from "../middleware/sanitize.js";

const loginRouter = express.Router();

loginRouter.post("/", sanitizeChars, loginAttempt);

export { loginRouter };
