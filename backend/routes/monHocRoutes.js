import express from "express";
import { getAllMonHoc } from "../controllers/monHocController.js";

const router = express.Router();

router.get("/", getAllMonHoc);

export default router;
