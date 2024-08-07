import express from "express";
import {
  addProject,
  addRole,
  editProject,
  editRole,
} from "../controllers/project.js";

import {is_auth} from "../middleware/jwtVarify.js";
const router = express.Router();
router.post("/addProject", is_auth, addProject);
router.post("/addRole", is_auth, addRole);
router.post("/editProject", is_auth, editProject);
router.post("/editRole", is_auth, editRole);

export const projectRouter = router;
