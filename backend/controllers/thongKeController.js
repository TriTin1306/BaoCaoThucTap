import { supabase } from "../config/supabaseClient.js";

export const thongKeGioDay = async (req, res) => {
  const { nam_hoc, hoc_ky } = req.query;

  const { data, error } = await supabase
    .from("phan_cong")
    .select(
      `
      ma_giao_vien,
      giao_vien ( ten_giao_vien )
    `,
    )
    .eq("nam_hoc", nam_hoc)
    .eq("hoc_ky", hoc_ky);

  if (error) return res.status(500).json({ error });

  // đếm số tiết
  const result = {};

  data.forEach((item) => {
    const ma = item.ma_giao_vien;
    const ten = item.giao_vien?.ten_giao_vien;

    if (!result[ma]) {
      result[ma] = {
        ma_giao_vien: ma,
        ten_giao_vien: ten,
        tong_tiet: 0,
      };
    }

    result[ma].tong_tiet += 1;
  });

  res.json(Object.values(result));
};

//thống kê giờ dạy theo giáo viên
export const thongKeGioDayTheoGiaoVien = async (req, res) => {
  const { ma_giao_vien } = req.params;
  const { nam_hoc, hoc_ky } = req.query;

  const { data, error } = await supabase
    .from("phan_cong")
    .select(
      `
      thu,
      tiet,
      nam_hoc,
      hoc_ky,
      giao_vien ( ten_giao_vien )
    `,
    )
    .eq("ma_giao_vien", ma_giao_vien)
    .eq("nam_hoc", nam_hoc)
    .eq("hoc_ky", hoc_ky);

  if (error) return res.status(500).json({ error });

  const tong_tiet = data.length;

  res.json({
    ma_giao_vien: ma_giao_vien,
    ten_giao_vien: data[0]?.giao_vien?.ten_giao_vien || "",
    nam_hoc: nam_hoc,
    hoc_ky: hoc_ky,
    tong_tiet: tong_tiet,
  });
};
