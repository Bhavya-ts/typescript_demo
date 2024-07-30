// const mongoose = require("mongoose");
import mongoose from "mongoose";
var Schema = mongoose.Schema;
var roleSchema = new Schema({
    projectId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});
export var roleModel = mongoose.model("Role", roleSchema);
