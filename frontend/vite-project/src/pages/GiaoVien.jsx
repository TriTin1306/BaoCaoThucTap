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
  getToChuyenMon,
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
  const [oldId, setOldId] = useState("");
  const [toChuyenMon, setToChuyenMon] = useState([]);

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
    chuc_vu: "",
  });

  /* ================================
     4️⃣ LOAD DANH SÁCH GIÁO VIÊN
     gọi API từ api.js
  =================================*/
  const loadGiaoVien = async () => {
    try {
      const data = await getGiaoVien();

      // Sắp xếp theo mã tăng dần
      const sorted = data.sort((a, b) =>
        a.ma_giao_vien.localeCompare(b.ma_giao_vien),
      );

      setGiaoVien(sorted);
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
      const toData = await getToChuyenMon();
      setToChuyenMon(toData);
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
        chuc_vu: "",
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
    setFormData(gv);
    setOldId(gv.ma_giao_vien); // lưu mã cũ
    setEditing(true);
    setShowForm(true);
  };
  /* ================================
     8️⃣ CẬP NHẬT GIÁO VIÊN
     gọi API update
  =================================*/
  const handleUpdate = async () => {
    try {
      await updateGiaoVien(oldId, formData);

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">
          👨‍🏫 Quản lý giáo viên
        </h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(false);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow"
        >
          + Thêm giáo viên
        </button>
      </div>

      {/* ================================
         11️⃣ FORM THÊM / SỬA
      =================================*/}
      {showForm && (
        <div className="border p-6 mb-6 bg-white rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="ma_giao_vien"
              placeholder="Mã giáo viên"
              className="border p-2 rounded"
              value={formData.ma_giao_vien || ""}
              onChange={handleChange}
            />

            <input
              name="ten_giao_vien"
              placeholder="Tên giáo viên"
              className="border p-2 rounded"
              value={formData.ten_giao_vien || ""}
              onChange={handleChange}
            />

            <input
              type="date"
              name="ngay_sinh"
              className="border p-2 rounded"
              value={formData.ngay_sinh || ""}
              onChange={handleChange}
            />

            <input
              name="gioi_tinh"
              placeholder="Giới tính"
              className="border p-2 rounded"
              value={formData.gioi_tinh || ""}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={formData.email || ""}
              onChange={handleChange}
            />

            <input
              name="so_dien_thoai"
              placeholder="SĐT"
              className="border p-2 rounded"
              value={formData.so_dien_thoai || ""}
              onChange={handleChange}
            />

            <input
              name="dia_chi"
              placeholder="Địa chỉ"
              className="border p-2 rounded"
              value={formData.dia_chi || ""}
              onChange={handleChange}
            />

            <select
              name="ma_to"
              className="border p-2 rounded"
              value={formData.ma_to || ""}
              onChange={handleChange}
            >
              <option value="">-- Chọn tổ chuyên môn --</option>
              {toChuyenMon.map((to) => (
                <option key={to.ma_to} value={to.ma_to}>
                  {to.ma_to} - {to.ten_to}
                </option>
              ))}
            </select>

            <select
              name="chuc_vu"
              className="border p-2 rounded"
              value={formData.chuc_vu || ""}
              onChange={handleChange}
            >
              <option value="">Chọn chức vụ</option>
              <option value="Hiệu trưởng">Hiệu trưởng</option>
              <option value="PHT">PHT</option>
              <option value="Tổ trưởng">Tổ trưởng</option>
              <option value="Tổ phó">Tổ phó</option>
              <option value="Giáo viên">Giáo viên</option>
            </select>
          </div>

          {/* BUTTON FORM */}
          <div className="mt-4">
            <button
              onClick={editing ? handleUpdate : handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              {editing ? "Cập nhật" : "Thêm"}
            </button>

            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* ================================
         12️⃣ BẢNG HIỂN THỊ GIÁO VIÊN
      =================================*/}
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="p-3">Mã</th>
            <th className="p-3">Tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">SĐT</th>
            <th className="p-3">Ngày sinh</th>
            <th className="p-3">Giới tính</th>
            <th className="p-3">Địa chỉ</th>
            <th className="p-3">Tổ</th>
            <th className="p-3">Chức vụ</th>
            <th className="p-3">Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {giaoVien.map((gv, index) => (
            <tr
              key={gv.ma_giao_vien}
              className={`text-center ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-100 transition`}
            >
              <td className="p-3 font-semibold">{gv.ma_giao_vien}</td>
              <td>{gv.ten_giao_vien}</td>
              <td>{gv.email}</td>
              <td>{gv.so_dien_thoai}</td>

              <td>
                {gv.ngay_sinh
                  ? new Date(gv.ngay_sinh).toLocaleDateString()
                  : ""}
              </td>

              <td>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {gv.gioi_tinh}
                </span>
              </td>

              <td>{gv.dia_chi}</td>

              <td>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {gv.ma_to}
                </span>
              </td>

              <td>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                  {gv.chuc_vu}
                </span>
              </td>

              <td className="p-2">
                <button
                  onClick={() => handleEdit(gv)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(gv.ma_giao_vien)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
