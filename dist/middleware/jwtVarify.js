// import jwt from "jsonwebtoken";
// import {  JwtPayload} from "../types/express";
import jwt from "jsonwebtoken";
export var is_auth = function (req, res, next) {
    var authorization = req.get("authorization");
    console.log(authorization);
    if (!authorization) {
        return res.send("Please login first");
    }
    var token = authorization.split(" ")[1];
    console.log("token = ", token);
    //varify the jwt token
    var decoded = jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).send("Not valid token");
        }
        // Check if decoded is a non-null object and has the properties you expect
        // if (typeof decoded !== 'object' || decoded === null) {
        //   return res.status(401).send("Invalid token");
        // }
        var payload = decoded;
        if (req.baseUrl === "/project" && payload.role !== "director") {
            return res.status(401).send("Only Director can access this route");
        }
        // Attach the payload to the request object
        req.payload = {
            email: payload.email,
            userId: payload.user,
            role: payload.role,
        };
        // Ensure decoded is defined before accessing properties
        // if (decoded) {
        //   req.payload = {
        //     userId: decoded.userId,
        //     role: decoded.role,
        //     email: decoded.email,
        //   };
        //   console.log("req.payload = ", req.payload);
        // } else {
        //   return res.status(401).send("Invalid token payload");
        // }
        next();
    });
};
