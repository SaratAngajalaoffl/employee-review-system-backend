import jwt from "jsonwebtoken";

export const generateToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            process.env.PVT_KEY,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
            (err, resp) => {
                if (err) reject(err);
                resolve(resp);
            }
        );
    });
};

export const verifyJWT = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(token, process.env.PVT_KEY, function (err, decoded) {
            if (err) {
                console.log("verify -- ", err);
                return res
                    .status(401)
                    .json({ error: true, message: err.message });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(401).send("Unauthorized");
    }
};

export const verifyAdmin = (req, res, next) => {
    if (!req.decoded.isAdmin) return res.status(401).send("Unauthorised");

    next();
};
