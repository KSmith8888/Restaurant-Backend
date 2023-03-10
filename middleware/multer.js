import multer from "multer";

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "../public/uploads");
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
        req.filepath = `${process.env.BASE_URL}uploads/${newName}`;
    },
});

export { storage };
