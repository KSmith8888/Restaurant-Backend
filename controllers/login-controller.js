import jwt from "jsonwebtoken";

let adminToken;
let realUsername;
let realPassword;
const testId = new Date().getDate();

const createAccount = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error("Credentials not provided");
        } else {
            realUsername = req.body.username;
            realPassword = req.body.password;
        }
        const token = jwt.sign(
            { id: testId, username: realUsername },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );
        adminToken = token;
        res.status(200).json({ status: "success", token: adminToken });
    } catch (error) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const loginAttempt = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        const authInfo = req.headers.authorization;
        const paramUsername = req.body.username;
        const paramPassword = req.body.password;
        if (realUsername !== paramUsername || realPassword !== paramPassword) {
            throw new Error(
                "Authentication failed, credentials do not match a valid user"
            );
        }
        if (!authInfo || !authInfo.includes("Bearer ")) {
            throw new Error("No token found or invalid token format");
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        res.status(200);
        res.json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const optionsPreflight = (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", [
            "content-type",
            "authorization",
        ]);
        res.status(200);
        res.json({ msg: "Preflight Passed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { optionsPreflight, loginAttempt, createAccount };
