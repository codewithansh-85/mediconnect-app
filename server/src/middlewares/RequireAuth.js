import jwt from "jsonwebtoken"

const RequireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        if (!authHeader) {
            return res.status(401).send({
                message: " no authHeader Log in to Book Appointment",
                Status: "notsuccess",
            });
        }

        const token = authHeader.split(" ")[1];
        console.log(token)
        if (!token || token === "null" || token === "undefined") {
            return res.status(401).send({
                message: "Log in to Book Appointment",
                Status: "notsuccess",
            });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded)
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).send({
            message: "Invalid or expired token, please login again",
            Status: "notsuccess",
        });
    }
}

export default RequireAuth