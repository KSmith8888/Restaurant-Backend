function sanitizeChars(req, res, next) {
    try {
        const userInput =
            req.body.username + req.body.password + req.headers.authorization;
        if (
            !userInput.includes("<") &&
            !userInput.includes(">") &&
            !userInput.includes("`") &&
            !userInput.includes("{") &&
            !userInput.includes("}") &&
            !userInput.includes("=") &&
            !userInput.includes("&") &&
            !userInput.includes(";") &&
            !userInput.includes("(") &&
            !userInput.includes(")") &&
            !userInput.includes("|") &&
            !userInput.includes("/") &&
            !userInput.includes("@") &&
            !userInput.includes("$")
        ) {
            next();
        } else {
            throw new Error("User input includes special characters");
        }
    } catch (err) {
        console.error(err);
        res.status(401).json({
            msg: "Please do not include special characters in credentials",
        });
    }
}
export { sanitizeChars };
