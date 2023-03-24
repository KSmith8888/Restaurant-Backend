import mongoose from "mongoose";
mongoose.set("strictQuery", false);

import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

function startApp() {
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`App is listening on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

startApp();
