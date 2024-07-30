import mongoose from "mongoose";
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
export var userModel = mongoose.model("user", UserSchema);
