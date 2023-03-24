const logoutUser = (req, res) => {
    try {
        res.header(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains"
        );
        res.cookie("token", "logged-out", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 500,
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
