import express from "express";

import {
  getAllToChuyenMon,
  createToChuyenMon,
  updateToChuyenMon,
  deleteToChuyenMon,
} from "../controllers/toChuyenMonController.js";

const router = express.Router();

router.get("/", getAllToChuyenMon);
router.post("/", createToChuyenMon);
router.put("/:id", updateToChuyenMon);
router.delete("/:id", deleteToChuyenMon);

export default router;
