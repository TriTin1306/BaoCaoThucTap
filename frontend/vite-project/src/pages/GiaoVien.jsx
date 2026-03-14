import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

/* ================================
   IMPORT API TỪ FILE api.js
   (Thay vì fetch trực tiếp)
=================================*/
import {
  getGiaoVien,
  createGiaoVien,
  updateGiaoVien,
  deleteGiaoVien,
} from "../api/api";

function GiaoVien() {
  /* ================================
     1️⃣ STATE LƯU DANH SÁCH GIÁO VIÊN
     dùng để hiển thị bảng
  =================================*/
  const [giaoVien, setGiaoVien] = useState([]);

  /* ================================
     2️⃣ STATE ĐIỀU KHIỂN FORM
     showForm : hiển thị form
     editing : đang sửa hay đang thêm
  =================================*/
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  /* ================================
     3️⃣ STATE LƯU DỮ LIỆU FORM
     dùng cho input form
  =================================*/
  const [formData, setFormData] = useState({
    ma_giao_vien: "",
    ten_giao_vien: "",
    ngay_sinh: "",
    gioi_tinh: "",
    email: "",
    so_dien_thoai: "",
    dia_chi: "",
    ma_to: "",
  });

  /* ================================
     4️⃣ LOAD DANH SÁCH GIÁO VIÊN
     gọi API từ api.js
  =================================*/
  const loadGiaoVien = async () => {
    try {
      const data = await getGiaoVien(); // gọi API
      setGiaoVien(data); // lưu vào state
    } catch (error) {
      console.error(error);
    }
  };

  /* ================================
     useEffect chạy khi component load
  =================================*/
  useEffect(() => {
    const fetchData = async () => {
      await loadGiaoVien();
    };

    fetchData();
  }, []);

  /* ================================
     5️⃣ XỬ LÝ INPUT FORM
     cập nhật formData khi nhập
  =================================*/
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================================
     6️⃣ THÊM GIÁO VIÊN
     gọi API createGiaoVien
  =================================*/
  const handleAdd = async () => {
    try {
      await createGiaoVien(formData);

      setShowForm(false);

      // reset form
      setFormData({
        ma_giao_vien: "",
        ten_giao_vien: "",
        ngay_sinh: "",
        gioi_tinh: "",
        email: "",
        so_dien_thoai: "",
        dia_chi: "",
        ma_to: "",
      });

      loadGiaoVien(); // reload dữ liệu
    } catch (error) {
      console.error(error);
    }
  };

  /* ================================
     7️⃣ CHỌN GIÁO VIÊN ĐỂ SỬA
  =================================*/
  const handleEdit = (gv) => {
    setFormData(gv); // đổ dữ liệu vào form
    setEditing(true);
    setShowForm(true);
  };

  /* ================================
     8️⃣ CẬP NHẬT GIÁO VIÊN
     gọi API update
  =================================*/
  const handleUpdate = async () => {
    try {
      await updateGiaoVien(formData.ma_giao_vien, formData);

      setShowForm(false);
      setEditing(false);

      loadGiaoVien();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================================
     9️⃣ XÓA GIÁO VIÊN
  =================================*/
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deleteGiaoVien(id);

      loadGiaoVien();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      {/* ================================
         10️⃣ TIÊU ĐỀ + NÚT THÊM
      =================================*/}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Quản lý giáo viên</h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(false);
          }}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Thêm giáo viên
        </button>
      </div>

      {/* ================================
         11️⃣ FORM THÊM / SỬA
      =================================*/}
      {showForm && (
        <div className="border p-4 mb-4 bg-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="ma_giao_vien"
              placeholder="Mã giáo viên"
              className="border p-2"
              value={formData.ma_giao_vien || ""}
              onChange={handleChange}
            />

            <input
              name="ten_giao_vien"
              placeholder="Tên giáo viên"
              className="border p-2"
              value={formData.ten_giao_vien || ""}
              onChange={handleChange}
            />

            <input
              type="date"
              name="ngay_sinh"
              className="border p-2"
              value={formData.ngay_sinh || ""}
              onChange={handleChange}
            />

            <input
              name="gioi_tinh"
              placeholder="Giới tính"
              className="border p-2"
              value={formData.gioi_tinh || ""}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              className="border p-2"
              value={formData.email || ""}
              onChange={handleChange}
            />

            <input
              name="so_dien_thoai"
              placeholder="SĐT"
              className="border p-2"
              value={formData.so_dien_thoai || ""}
              onChange={handleChange}
            />

            <input
              name="dia_chi"
              placeholder="Địa chỉ"
              className="border p-2"
              value={formData.dia_chi || ""}
              onChange={handleChange}
            />

            <input
              name="ma_to"
              placeholder="Mã tổ"
              className="border p-2"
              value={formData.ma_to || ""}
              onChange={handleChange}
            />
          </div>

          {/* BUTTON FORM */}
          <div className="mt-4">
            <button
              onClick={editing ? handleUpdate : handleAdd}
              className="bg-green-500 text-white px-4 py-2 mr-2"
            >
              {editing ? "Cập nhật" : "Thêm"}
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* ================================
         12️⃣ BẢNG HIỂN THỊ GIÁO VIÊN
      =================================*/}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã</th>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">SĐT</th>
            <th className="border p-2">Ngày sinh</th>
            <th className="border p-2">Giới tính</th>
            <th className="border p-2">Địa chỉ</th>
            <th className="border p-2">Mã tổ</th>
            <th className="border p-2">Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {giaoVien.map((gv) => (
            <tr key={gv.ma_giao_vien}>
              <td className="border p-2">{gv.ma_giao_vien}</td>
              <td className="border p-2">{gv.ten_giao_vien}</td>
              <td className="border p-2">{gv.email}</td>
              <td className="border p-2">{gv.so_dien_thoai}</td>

              <td className="border p-2">
                {gv.ngay_sinh
                  ? new Date(gv.ngay_sinh).toLocaleDateString()
                  : ""}
              </td>

              <td className="border p-2">{gv.gioi_tinh}</td>
              <td className="border p-2">{gv.dia_chi}</td>
              <td className="border p-2">{gv.ma_to}</td>

              <td className="border p-2">
                <button
                  onClick={() => handleEdit(gv)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(gv.ma_giao_vien)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default GiaoVien;
