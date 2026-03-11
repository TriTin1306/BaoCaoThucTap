import { supabase } from "../config/supabaseClient.js";

// GET tất cả lớp học
export const getAllLopHoc = async (req, res) => {
  const { data, error } = await supabase.from("lop").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
};
