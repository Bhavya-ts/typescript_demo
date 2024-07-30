
// import jwt from "jsonwebtoken";
// import {  JwtPayload} from "../types/express";
import jwt, { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

export const is_auth = (req :Request, res:Response, next:NextFunction) => {
  const authorization = req.get("authorization");
  console.log(authorization);
  if (!authorization) {
    return res.send("Please login first");
  }

  const token = authorization.split(" ")[1];
  console.log("token = ", token);

 
  //varify the jwt token
  const decoded = jwt.verify(token,process.env.SECRET_KEY as string ,  (err,decoded) => {
    if (err) {
      return res.status(403).send("Not valid token");
    } 
    // Check if decoded is a non-null object and has the properties you expect
    // if (typeof decoded !== 'object' || decoded === null) {
    //   return res.status(401).send("Invalid token");
    // }
    
    const payload = decoded as JwtPayload & { email: string; user: string; role: string };
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
