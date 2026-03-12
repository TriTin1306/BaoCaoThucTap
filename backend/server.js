import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import giaoVienRoutes from "./routes/giaoVienRoutes.js";
import toChuyenMonRoutes from "./routes/toChuyenMonRoutes.js";
import nguoiDungRoutes from "./routes/nguoiDungRoutes.js";
import phanCongRoutes from "./routes/phanCongRoutes.js";
import monHocRoutes from "./routes/monHocRoutes.js";
import lopHocRoutes from "./routes/lopHocRoutes.js";
import tkbRoutes from "./routes/tkbRoutes.js";
import thongKeRoutes from "./routes/thongKeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/giaovien", giaoVienRoutes);
app.use("/api/tochuyenmon", toChuyenMonRoutes);
app.use("/api/nguoidung", nguoiDungRoutes);
app.use("/api/phancong", phanCongRoutes);
app.use("/api/monhoc", monHocRoutes);
app.use("/api/lophoc", lopHocRoutes);
app.use("/api/tkb", tkbRoutes);
app.use("/api/thongke", thongKeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
