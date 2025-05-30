import jwt from "jsonwebtoken";
import Logger from "../utils/logger.js";

export async function authenticateToken(req, res, next) {
    Logger.debug(`Incoming Headers: ${req.headers}`);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    Logger.info(`Token: ${token}`);
    if (token == null) {
        Logger.warn(`Auth token missing for path: ${req.path}`);
        return res.status(401).json({
            error: "Authentication required",
            message: "Authorization token is missing.",
        });
    }

    if (!process.env.JWT_SECRET) {
        Logger.error(
            `JWT_SECRET environment variable is not set for verification!`
        );
        return res
            .status(500)
            .json({ error: "Internal server configuration error." });
    }

    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        Logger.info(`Token verified, decoded payload: ${JSON.stringify(decodedPayload)}`);

        req.user = decodedPayload;
        Logger.info(`req.user assigned: ${JSON.stringify(req.user)}`);

        if (!req.user || !req.user.userId || !req.user.email) {
            Logger.error(`Decoded payload is missing expected fields! ${JSON.stringify(decodedPayload)}`);
            return res.status(403).json({
                error: "Invalid token payload",
                message: "Authentication token payload is malformed.",
            });
        }

        Logger.debug(`User appears valid, calling next() for path: ${req.path}`);
        next();
    } catch (err) {
        Logger.warn(`Auth token invalid for path: ${req.path}`, { error: err.message, token });
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                error: "Token expired",
                message: "Your session has expired. Please authenticate again.",
            });
        } else {
            return res.status(403).json({
                error: "Invalid token",
                message: "Your authentication token is invalid.",
            });
        }
    }
}
