import { supabase } from "../config/supabaseClient.js";

// Lấy tất cả tổ
export const getAllToChuyenMon = async (req, res) => {
  const { data, error } = await supabase.from("to_chuyen_mon").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Thêm tổ
export const createToChuyenMon = async (req, res) => {
  const { ma_to, ten_to } = req.body;

  const { data, error } = await supabase
    .from("to_chuyen_mon")
    .insert([
      {
        ma_to,
        ten_to,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Cập nhật tổ
export const updateToChuyenMon = async (req, res) => {
  const { id } = req.params;
  const { ten_to } = req.body;

  const { data, error } = await supabase
    .from("to_chuyen_mon")
    .update({ ten_to })
    .eq("ma_to", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Xóa tổ
export const deleteToChuyenMon = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("to_chuyen_mon")
    .delete()
    .eq("ma_to", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Xóa tổ thành công" });
};
