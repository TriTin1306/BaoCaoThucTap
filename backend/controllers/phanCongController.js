import { supabase } from "../config/supabaseClient.js";

//đọc phân công
export const getAllPhanCong = async (req, res) => {
  const { data, error } = await supabase.from("phan_cong").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
};

//post phân công
//post phân công (THÊM AUTO MÃ)
export const createPhanCong = async (req, res) => {
  try {
    const { ma_giao_vien, ma_lop, ma_mon, thu, tiet, nam_hoc, hoc_ky } =
      req.body;

    const { data: lastData, error: err1 } = await supabase
      .from("phan_cong")
      .select("ma_phan_cong")
      .order("ma_phan_cong", { ascending: false })
      .limit(1);

    if (err1) return res.status(500).json({ error: err1 });

    let newMa = "PC001";

    if (lastData && lastData.length > 0) {
      const lastMa = lastData[0].ma_phan_cong || "PC000";

      const number = parseInt(lastMa.slice(2)) || 0;

      // 🔥 FIX QUAN TRỌNG
      newMa = "PC" + (number + 1).toString().padStart(3, "0");
    }

    const { data, error } = await supabase
      .from("phan_cong")
      .insert([
        {
          ma_phan_cong: newMa,
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
