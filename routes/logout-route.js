import express from "express";

import { logoutUser } from "../controllers/logout-controller.js";
import { authorizeUser } from "../middleware/authorize.js";

const logoutRouter = express.Router();

logoutRouter.get("/", authorizeUser, logoutUser);

export { logoutRouter };
