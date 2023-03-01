const loginAttempt = async (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
    try {
        const authInfo = req.body;
        const realUsername = "test";
        const realPassword = "admin";
        console.log(req.body);
        const paramUsername = authInfo.user;
        const paramPassword = authInfo.pass;
        if (realUsername === paramUsername && realPassword === paramPassword) {
            res.status(200);
            res.json({ status: "success" });
        } else {
            throw new Error("Authentication failed");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

const optionsPreflight = (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", ["content-type"]);
        res.status(200);
        res.json({ msg: "Preflight Passed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { optionsPreflight, loginAttempt };
