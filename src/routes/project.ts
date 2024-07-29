import express from "express";
import {
  addProject,
  addRole,
  editProject,
  editRole,
} from "../controllers/project";


const middleware = require("../middleware/jwtVarify");
const router = express.Router();
router.post("/addProject", middleware.is_auth, addProject);
router.post("/addRole", middleware.is_auth, addRole);
router.post("/editProject", middleware.is_auth, editProject);
router.post("/editRole", middleware.is_auth, editRole);

module.exports = router;
