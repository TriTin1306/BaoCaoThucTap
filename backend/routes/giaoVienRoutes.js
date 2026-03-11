import express from "express";

import {
  getAllGiaoVien,
  createGiaoVien,
  updateGiaoVien,
  deleteGiaoVien,
} from "../controllers/giaoVienController.js";

const router = express.Router();

router.get("/", getAllGiaoVien);
router.post("/", createGiaoVien);
router.put("/:id", updateGiaoVien);
router.delete("/:id", deleteGiaoVien);

export default router;
