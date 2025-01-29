const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("token", token);

        if (!token) {
            return res.status(401).json({
                message: "User not logged in",
                error: true,
                success: false,
            }); 
        }

        jwt.verify(token, process.env.JSONWEBTOKEN, (error, decoded) => {
            if (error) {
                console.log("error auth", error);
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                });
            }

            console.log("decoded", decoded);

            req.userId = decoded?._id; // Ensure _id is available
            next(); // Proceed to the next middleware
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
