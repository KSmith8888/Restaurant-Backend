const logoutUser = (req, res) => {
    try {
        res.header("Strict-Transport-Security", "max-age=60000");
        res.cookie("token", "logged-out", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000,
        });
        res.status(200);
        res.json({ status: "success" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "There has been an error, please try again later",
        });
    }
};

export { logoutUser };
