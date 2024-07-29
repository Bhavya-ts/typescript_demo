// const express = require("express");
import express from "express";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const publicRouter = require("./routes/public");
const projectRouter = require("./routes/project");
const dotenv = require("dotenv");
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
