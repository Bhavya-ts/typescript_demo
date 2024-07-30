import mongoose from "mongoose";
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    name: String,
    description: String,
    status: {
        type: String,
        default: "draft",
    },
    createdBy: {
        type: String,
        required: true,
    },
});
export var project = mongoose.model("project", ProjectSchema);
