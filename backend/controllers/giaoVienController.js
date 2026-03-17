import { supabase } from "../config/supabaseClient.js";

// GET danh sách giáo viên
export const getAllGiaoVien = async (req, res) => {
  const { data, error } = await supabase
    .from("giao_vien")
    .select("*")
    .order("ma_giao_vien", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// POST thêm giáo viên
export const createGiaoVien = async (req, res) => {
  const {
    ma_giao_vien,
    ten_giao_vien,
    ngay_sinh,
    gioi_tinh,
    email,
    so_dien_thoai,
    dia_chi,
    ma_to,
    chuc_vu,
  } = req.body;

  const { data, error } = await supabase
    .from("giao_vien")
    .insert([
      {
        ma_giao_vien,
        ten_giao_vien,
        ngay_sinh,
        gioi_tinh,
        email,
        so_dien_thoai,
        dia_chi,
        ma_to,
        chuc_vu,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};
//PUT giáo Viên

export const updateGiaoVien = async (req, res) => {
  const { id } = req.params;

  const {
    ma_giao_vien,
    ten_giao_vien,
    ngay_sinh,
    gioi_tinh,
    email,
    so_dien_thoai,
    dia_chi,
    ma_to,
    chuc_vu,
  } = req.body;

  const { data, error } = await supabase
    .from("giao_vien")
    .update({
      ma_giao_vien,
      ten_giao_vien,
      ngay_sinh,
      gioi_tinh,
      email,
      so_dien_thoai,
      dia_chi,
      ma_to,
      chuc_vu,
    })
    .eq("ma_giao_vien", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Delete giáo viên
export const deleteGiaoVien = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("giao_vien")
    .delete()
    .eq("ma_giao_vien", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({
    message: "Xóa giáo viên thành công",
  });
};
