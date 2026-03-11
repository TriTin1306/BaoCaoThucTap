import express from "express";

import {
  getAllPhanCong,
  createPhanCong,
  updatePhanCong,
  deletePhanCong,
} from "../controllers/phanCongController.js";

const router = express.Router();

router.get("/", getAllPhanCong);
router.post("/", createPhanCong);
router.put("/:id", updatePhanCong);
router.delete("/:id", deletePhanCong);

export default router;
