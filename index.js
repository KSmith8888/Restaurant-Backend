import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

import { menuRouter } from "./routes/menu-route.js";
import { loginRouter } from "./routes/login-route.js";

const app = express();

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        let fileExt;
        if (file.originalname.includes(".jpg")) {
            fileExt = ".jpg";
        } else if (file.originalname.includes(".png")) {
            fileExt = ".png";
        }
        const newName = `${Date.now()}-image${fileExt}`;
        cb(null, newName);
        req.filepath = process.env.BASE_URL + newName;
    },
});
const upload = multer({ storage: storage });

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/menu", upload.single("image"), menuRouter);
app.use("/api/v1/login", loginRouter);

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
