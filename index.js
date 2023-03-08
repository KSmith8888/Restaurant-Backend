import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

import { menuRouter } from "./routes/menu-route.js";
import { loginRouter } from "./routes/login-route.js";
import { logoutRouter } from "./routes/logout-route.js";

const app = express();

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/logout", logoutRouter);

function startApp() {
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log(`App is listening on port ${process.env.PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

startApp();
