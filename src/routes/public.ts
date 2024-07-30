
import express from "express";
import {signup,sigin,showPerticcularProject} from "../controllers/public.js";
import{is_auth} from "../middleware/jwtVarify.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", sigin);
router.get(
  "/showPerticcularProject",
  is_auth,
  showPerticcularProject
);

export const publicRouter = router;
