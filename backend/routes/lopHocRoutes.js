import express from "express";
import { getAllLopHoc } from "../controllers/lopHocController.js";

const router = express.Router();

router.get("/", getAllLopHoc);

export default router;
