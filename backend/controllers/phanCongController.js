import { supabase } from "../config/supabaseClient.js";

//đọc phân công
export const getAllPhanCong = async (req, res) => {
  const { data, error } = await supabase.from("phan_cong").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
};

//post phân công
export const createPhanCong = async (req, res) => {
  const {
    ma_phan_cong,
    ma_giao_vien,
    ma_lop,
    ma_mon,
    thu,
    tiet,
    nam_hoc,
    hoc_ky,
  } = req.body;

  const { data, error } = await supabase
    .from("phan_cong")
    .insert([
      {
        ma_phan_cong,
        ma_giao_vien,
        ma_lop,
        ma_mon,
        thu,
        tiet,
        nam_hoc,
        hoc_ky,
      },
    ])
    .select();

  if (error) return res.status(500).json({ error });

  res.json(data);
};

//cập nhật phân công
export const updatePhanCong = async (req, res) => {
  const { id } = req.params;

  const { ma_giao_vien, ma_lop, ma_mon, thu, tiet, nam_hoc, hoc_ky } = req.body;

  const { data, error } = await supabase
    .from("phan_cong")
    .update({
      ma_giao_vien,
      ma_lop,
      ma_mon,
      thu,
      tiet,
      nam_hoc,
      hoc_ky,
    })
    .eq("ma_phan_cong", id)
    .select();

  if (error) return res.status(500).json({ error });

  res.json(data);
};

//xóa phân công
export const deletePhanCong = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("phan_cong")
    .delete()
    .eq("ma_phan_cong", id);

  if (error) return res.status(500).json({ error });

  res.json({ message: "Deleted successfully" });
};
