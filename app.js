import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { loginRouter } from "./routes/login-route.js";
import { scheduleRouter } from "./routes/schedule-route.js";
import { tasksRouter } from "./routes/tasks-route.js";
import { menuRouter } from "./routes/menu-route.js";
import { eventsRouter } from "./routes/events-route.js";
import { registerRouter } from "./routes/register-route.js";
import { logoutRouter } from "./routes/logout-route.js";
import { authorizeUser, authorizeAdmin } from "./middleware/authorize.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/schedule", scheduleRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/events", eventsRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/logout", logoutRouter);

app.use(express.static("./public"));
app.use(authorizeUser, authorizeAdmin, express.static("./static"));

export { app };
