import { supabase } from "../config/supabaseClient.js";

// TKB theo lớp
export const getTKBTheoLop = async (req, res) => {
  const { ma_lop } = req.params;

  const { data, error } = await supabase
    .from("phan_cong")
    .select(
      `
      thu,
      tiet,
      nam_hoc,
      hoc_ky,
      giao_vien ( ten_giao_vien ),
      mon_hoc ( ten_mon ),
      lop ( ten_lop )
    `,
    )
    .eq("ma_lop", ma_lop);

  if (error) return res.status(500).json({ error });

  res.json(data);
};
// TKB theo giáo viên
export const getTKBTheoGiaoVien = async (req, res) => {
  const { ma_giao_vien } = req.params;

  const { data, error } = await supabase
    .from("phan_cong")
    .select(
      `
      thu,
      tiet,
      nam_hoc,
      hoc_ky,
      lop ( ten_lop ),
      mon_hoc ( ten_mon ),
      giao_vien ( ten_giao_vien )
    `,
    )
    .eq("ma_giao_vien", ma_giao_vien);

  if (error) return res.status(500).json({ error });

  res.json(data);
};
