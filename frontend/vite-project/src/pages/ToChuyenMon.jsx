import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getToChuyenMon,
  createToChuyenMon,
  updateToChuyenMon,
  deleteToChuyenMon,
} from "../api/api";

function ToChuyenMon() {
  /* =========================
     STATE DANH SÁCH TỔ
  ========================= */
  const [toChuyenMon, setToChuyenMon] = useState([]);

  /* =========================
     FORM STATE
  ========================= */
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    ma_to: "",
    ten_to: "",
  });

  /* =========================
     LOAD DỮ LIỆU
  ========================= */
  const loadToChuyenMon = async () => {
    try {
      const data = await getToChuyenMon();

      const sorted = data.sort((a, b) => a.ma_to.localeCompare(b.ma_to));

      setToChuyenMon(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadToChuyenMon();
    };
    fetchData();
  }, []);
  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     THÊM TỔ
  ========================= */
  const handleAdd = async () => {
    try {
      await createToChuyenMon(formData);

      setShowForm(false);

      setFormData({
        ma_to: "",
        ten_to: "",
      });

      loadToChuyenMon();
    } catch (error) {
      console.error(error);
    }
  };

  /* =========================
     SỬA TỔ
  ========================= */
  const handleEdit = (to) => {
    setFormData(to);
    setEditing(true);
    setShowForm(true);
  };

  /* =========================
     CẬP NHẬT
  ========================= */
  const handleUpdate = async () => {
    try {
      await updateToChuyenMon(formData.ma_to, formData);

      setShowForm(false);
      setEditing(false);

      loadToChuyenMon();
    } catch (error) {
      console.error(error);
    }
  };

  /* =========================
     XÓA TỔ
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deleteToChuyenMon(id);
      loadToChuyenMon();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">
          🏫 Quản lý tổ chuyên môn
        </h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(false);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow"
        >
          + Thêm tổ
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="border p-6 mb-6 bg-white rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="ma_to"
              placeholder="Mã tổ"
              className="border p-2"
              value={formData.ma_to || ""}
              onChange={handleChange}
            />

            <input
              name="ten_to"
              placeholder="Tên tổ"
              className="border p-2"
              value={formData.ten_to || ""}
              onChange={handleChange}
            />
          </div>

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

      {/* TABLE */}
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="p-3">Mã tổ</th>
            <th className="p-3">Tên tổ</th>
            <th className="p-3">Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {toChuyenMon.map((to, index) => (
            <tr
              key={to.ma_to}
              className={`text-center ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-100 transition`}
            >
              <td className="p-3 font-semibold">{to.ma_to}</td>

              <td>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {to.ten_to}
                </span>
              </td>

              <td className="p-2">
                <button
                  onClick={() => handleEdit(to)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(to.ma_to)}
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

export default ToChuyenMon;
