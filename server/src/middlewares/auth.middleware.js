import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import BlacklistToken from "../models/BlacklistToken.js";

const authMiddleware = async (req, res, next) => {
    // get token from header
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token Provided!!! "});
    }

    const token = authHeader.split(" ")[1];

    //check blacklist
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Token expired or logged out" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // decode = { id, role }

        // get user from db
        const user = await User.findById(decoded.id).populate("roleId");
        if (!user) return res.status(401).json({ message: "User not Found" });

        req.user = { id: user._id, role: user.roleId.name };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;