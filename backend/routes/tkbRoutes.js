import express from "express";
import {
  getTKBTheoLop,
  getTKBTheoGiaoVien,
} from "../controllers/tkbController.js";

const router = express.Router();

router.get("/lop/:ma_lop", getTKBTheoLop);
router.get("/giaovien/:ma_giao_vien", getTKBTheoGiaoVien);

export default router;
