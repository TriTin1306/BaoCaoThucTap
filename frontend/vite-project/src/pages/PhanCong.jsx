import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getAllPhanCong,
  createPhanCong,
  updatePhanCong,
  deletePhanCong,
  getGiaoVien,
  getMonHoc,
  getLop,
} from "../api/api";

function PhanCong() {
  const [phanCong, setPhanCong] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [oldId, setOldId] = useState("");

  const [giaoVien, setGiaoVien] = useState([]);
  const [monHoc, setMonHoc] = useState([]);
  const [lop, setLop] = useState([]);

  const [formData, setFormData] = useState({
    ma_phan_cong: "",
    ma_giao_vien: "",
    ma_lop: "",
    ma_mon: "",
    thu: "",
    tiet: "",
    nam_hoc: "",
    hoc_ky: "",
  });

  //Load dữ liệu dropdown
  const loadDropdown = async () => {
    try {
      const gv = await getGiaoVien();
      const mh = await getMonHoc();
      const l = await getLop();

      setGiaoVien(gv);
      setMonHoc(mh);
      setLop(l);
    } catch (err) {
      console.error(err);
    }
  };

  // load dữ liệu
  const loadPhanCong = async () => {
    try {
      const data = await getAllPhanCong();

      // sắp xếp theo mã
      const sorted = data.sort((a, b) =>
        a.ma_phan_cong.localeCompare(b.ma_phan_cong),
      );

      setPhanCong(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadPhanCong();
      await loadDropdown();
    };

    fetchData();
  }, []);

  // xử lý input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // thêm
  const handleAdd = async () => {
    try {
      await createPhanCong(formData);

      setShowForm(false);
      resetForm();
      loadPhanCong();
    } catch (err) {
      console.error(err);
    }
  };

  // sửa
  const handleEdit = (pc) => {
    setFormData(pc);
    setOldId(pc.ma_phan_cong);
    setEditing(true);
    setShowForm(true);
  };

  // update
  const handleUpdate = async () => {
    try {
      await updatePhanCong(oldId, formData);

      setShowForm(false);
      setEditing(false);
      resetForm();
      loadPhanCong();
    } catch (err) {
      console.error(err);
    }
  };

  // xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deletePhanCong(id);
      loadPhanCong();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      ma_phan_cong: "",
      ma_giao_vien: "",
      ma_lop: "",
      ma_mon: "",
      thu: "",
      tiet: "",
      nam_hoc: "",
      hoc_ky: "",
    });
  };

  const getTenGV = (ma) => {
    const gv = giaoVien.find((x) => x.ma_giao_vien === ma);
    return gv ? gv.ten_giao_vien : ma;
  };

  const getTenLop = (ma) => {
    const l = lop.find((x) => x.ma_lop === ma);
    return l ? l.ten_lop : ma;
  };

  const getTenMon = (ma) => {
    const m = monHoc.find((x) => x.ma_mon === ma);
    return m ? m.ten_mon : ma;
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">
          📚 Quản lý phân công
        </h2>

        <button
          onClick={() => {
            setShowForm(true);
            setEditing(false);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow"
        >
          + Thêm phân công
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="border p-4 mb-4 bg-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <span className="text-gray-500 italic">(Mã sẽ tự động tạo)</span>

            <select
              name="ma_giao_vien"
              className="border p-2"
              value={formData.ma_giao_vien}
              onChange={handleChange}
            >
              <option value="">Chọn giáo viên</option>

              {giaoVien.length > 0 &&
                giaoVien.map((gv) => (
                  <option key={gv.ma_giao_vien} value={gv.ma_giao_vien}>
                    {gv.ten_giao_vien}
                  </option>
                ))}
            </select>

            <select
              name="ma_lop"
              className="border p-2"
              value={formData.ma_lop || ""}
              onChange={handleChange}
            >
              <option value="">Chọn lớp</option>

              {lop.map((l) => (
                <option key={l.ma_lop} value={l.ma_lop}>
                  {l.ten_lop}
                </option>
              ))}
            </select>

            <select
              name="ma_mon"
              className="border p-2"
              value={formData.ma_mon || ""}
              onChange={handleChange}
            >
              <option value="">Chọn môn</option>

              {monHoc.map((m) => (
                <option key={m.ma_mon} value={m.ma_mon}>
                  {m.ten_mon}
                </option>
              ))}
            </select>

            <input
              name="thu"
              placeholder="Thứ"
              className="border p-2"
              value={formData.thu}
              onChange={handleChange}
            />

            <input
              name="tiet"
              placeholder="Tiết"
              className="border p-2"
              value={formData.tiet}
              onChange={handleChange}
            />

            <input
              name="nam_hoc"
              placeholder="Năm học"
              className="border p-2"
              value={formData.nam_hoc}
              onChange={handleChange}
            />

            <input
              name="hoc_ky"
              placeholder="Học kỳ"
              className="border p-2"
              value={formData.hoc_ky}
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
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Mã</th>
            <th className="p-3">Giáo viên</th>
            <th className="p-3">Lớp</th>
            <th className="p-3">Môn</th>
            <th className="p-3">Thứ</th>
            <th className="p-3">Tiết</th>
            <th className="p-3">Năm học</th>
            <th className="p-3">Học kỳ</th>
            <th className="p-3">Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {phanCong.map((pc, index) => (
            <tr
              key={pc.ma_phan_cong}
              className={`text-center ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-100 transition`}
            >
              <td className="p-3 font-semibold">{pc.ma_phan_cong}</td>
              <td>{getTenGV(pc.ma_giao_vien)}</td>
              <td>{getTenLop(pc.ma_lop)}</td>
              <td>{getTenMon(pc.ma_mon)}</td>
              <td>{pc.thu}</td>
              <td>{pc.tiet}</td>
              <td>{pc.nam_hoc}</td>
              <td>{pc.hoc_ky}</td>

              <td className="p-2">
                <button
                  onClick={() => handleEdit(pc)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(pc.ma_phan_cong)}
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

export default PhanCong;
