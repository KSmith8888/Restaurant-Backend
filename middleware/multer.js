import multer from "multer";

const multStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        let fileExt;
        if (file.mimetype === "image/jpeg") {
            fileExt = ".jpg";
        } else if (file.mimetype === "image/png") {
            fileExt = ".png";
        }
        const newName = `${Date.now()}-image${fileExt}`;
        cb(null, newName);
        req.filepath = `${process.env.BASE_URL}uploads/${newName}`;
    },
});

const multFilter = (req, file, cb) => {
    try {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            cb(new Error("File is not an image"), false);
        } else {
            cb(null, true);
        }
    } catch (err) {
        console.error(err);
    }
};

export { multStorage, multFilter };
