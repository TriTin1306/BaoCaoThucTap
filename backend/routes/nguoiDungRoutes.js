import express from "express";

import {
  getAllTaiKhoan,
  createTaiKhoan,
  updateTaiKhoan,
  deleteTaiKhoan,
} from "../controllers/nguoiDungController.js";

const router = express.Router();

router.get("/", getAllTaiKhoan);
router.post("/", createTaiKhoan);
router.put("/:id", updateTaiKhoan);
router.delete("/:id", deleteTaiKhoan);

export default router;
