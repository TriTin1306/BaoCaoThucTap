import { supabase } from "../config/supabaseClient.js";

// GET tất cả môn học
export const getAllMonHoc = async (req, res) => {
  const { data, error } = await supabase.from("mon_hoc").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
};
