
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
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

export const project =  mongoose.model("project", ProjectSchema);
