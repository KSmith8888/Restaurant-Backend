function sanitizeChars(req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            throw new Error("Username or password not provided");
        }
        if (
            typeof req.body.username !== "string" ||
            typeof req.body.password !== "string"
        ) {
            throw new Error("Username or password is not a string");
        }
        const reg = new RegExp("^[a-zA-Z0-9 -.]+$");
        if (reg.test(username) && reg.test(password)) {
            next();
        } else {
            throw new Error("User input includes special characters");
        }
    } catch (err) {
        console.error(err);
        res.status(400);
        res.json({
            msg: "Please do not include special characters in credentials",
        });
    }
}
export { sanitizeChars };
