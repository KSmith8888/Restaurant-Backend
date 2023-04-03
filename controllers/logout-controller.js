import { wrapper } from "../middleware/wrapper.js";

const logoutUser = wrapper((req, res) => {
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
});

export { logoutUser };
