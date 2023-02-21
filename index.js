import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";

import { addNewItem } from "./routes/add-new-item.js";
import { getMenu } from "./routes/get-menu.js";

const app = express();

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "./uploads");
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

app.use(express.static("uploads"));

app.use(express.urlencoded({ extended: false }));

app.use("/add", upload.single("image"), addNewItem);
app.use("/menu", getMenu);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
