import { supabase } from "../config/supabaseClient.js";

export const login = async (req, res) => {
  try {
    const { ten_dang_nhap, mat_khau } = req.body;

    if (!ten_dang_nhap || !mat_khau) {
      return res.status(400).json({
        message: "Thiếu tên đăng nhập hoặc mật khẩu",
      });
    }

    const { data, error } = await supabase
      .from("tai_khoan")
      .select("*")
      .eq("ten_dang_nhap", ten_dang_nhap)
      .single();

    if (error || !data) {
      return res.status(401).json({
        message: "Tài khoản không tồn tại",
      });
    }

    if (data.mat_khau !== mat_khau) {
      return res.status(401).json({
        message: "Sai mật khẩu",
      });
    }

    return res.json({
      message: "Đăng nhập thành công",
      user: {
        ma_tai_khoan: data.ma_tai_khoan,
        ten_dang_nhap: data.ten_dang_nhap,
        vai_tro: data.vai_tro,
        ma_giao_vien: data.ma_giao_vien,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi server",
      error: err.message,
    });
  }
};
