import { supabase } from "../config/supabaseClient.js";

// READ tất cả tài khoản
export const getAllTaiKhoan = async (req, res) => {
  const { data, error } = await supabase.from("tai_khoan").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
};

// CREATE tài khoản
export const createTaiKhoan = async (req, res) => {
  const { ma_tai_khoan, ten_dang_nhap, mat_khau, vai_tro, ma_giao_vien } =
    req.body;

  const { data, error } = await supabase
    .from("tai_khoan")
    .insert([
      {
        ma_tai_khoan,
        ten_dang_nhap,
        mat_khau,
        vai_tro,
        ma_giao_vien,
      },
    ])
    .select();

  if (error) return res.status(500).json({ error });

  res.json(data);
};

// UPDATE tài khoản
export const updateTaiKhoan = async (req, res) => {
  const { id } = req.params;
  const { ten_dang_nhap, mat_khau, vai_tro, ma_giao_vien } = req.body;

  const { data, error } = await supabase
    .from("tai_khoan")
    .update({
      ten_dang_nhap,
      mat_khau,
      vai_tro,
      ma_giao_vien,
    })
    .eq("ma_tai_khoan", id)
    .select();

  if (error) return res.status(500).json({ error });

  res.json(data);
};

// DELETE tài khoản
export const deleteTaiKhoan = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tai_khoan")
    .delete()
    .eq("ma_tai_khoan", id);

  if (error) return res.status(500).json({ error });

  res.json({ message: "Deleted successfully" });
};
