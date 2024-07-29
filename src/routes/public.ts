
import express from "express";
import {signup,sigin,showPerticcularProject} from "../controllers/public";
import{is_auth} from "../middleware/jwtVarify";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", sigin);
router.get(
  "/showPerticcularProject",
  is_auth,
  showPerticcularProject
);

module.exports = router;
