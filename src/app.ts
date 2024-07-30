// const express = require("express");
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {publicRouter} from "./routes/public.js";
// const publicRouter = require("./routes/public");
import {projectRouter} from  "./routes/project.js";
// const projectRouter = require("./routes/project");
import dotenv from "dotenv";
// const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose
  .connect(
    "mongodb+srv://Bhavya_09:UsFRHsiMSTJsjuKD@cluster0.kwywqqu.mongodb.net/"
  )
  .then(() => {
    console.log("Connected successfully");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(publicRouter);
    app.use("/project", projectRouter);
    app.listen(3000);
  })
  .catch(() => {
    console.log("Failed to connect DB");
  });
