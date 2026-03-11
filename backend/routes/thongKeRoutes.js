import express from "express";
import {
  thongKeGioDay,
  thongKeGioDayTheoGiaoVien,
} from "../controllers/thongKeController.js";

const router = express.Router();

// thống kê giờ dạy toàn bộ giáo viên
router.get("/gioday", thongKeGioDay);

// thống kê giờ dạy 1 giáo viên
router.get("/giaovien/:ma_giao_vien", thongKeGioDayTheoGiaoVien);

export default router;
