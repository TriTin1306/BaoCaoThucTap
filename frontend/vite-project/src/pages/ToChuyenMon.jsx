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
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Quản lý tổ chuyên môn</h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(false);
          }}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Thêm tổ
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="border p-4 mb-4 bg-gray-100">
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

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã tổ</th>
            <th className="border p-2">Tên tổ</th>
            <th style={{ width: "150px", textAlign: "center" }}>Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {toChuyenMon.map((to) => (
            <tr key={to.ma_to}>
              <td className="border p-2">{to.ma_to}</td>
              <td className="border p-2">{to.ten_to}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  style={{
                    background: "#f0ad4e",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(to)}
                >
                  Sửa
                </button>

                <button
                  style={{
                    background: "#d9534f",
                    border: "none",
                    padding: "5px 10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(to.ma_to)}
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
