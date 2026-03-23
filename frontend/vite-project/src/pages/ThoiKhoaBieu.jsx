import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  getLop,
  getGiaoVien,
  getTKBTheoLop,
  getTKBTheoGiaoVien,
} from "../api/api";

function ThoiKhoaBieu() {
  const [type, setType] = useState("lop"); // lop | giaovien
  const [selected, setSelected] = useState("");

  const [lop, setLop] = useState([]);
  const [giaoVien, setGiaoVien] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     LOAD DROPDOWN
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const l = await getLop();
        const gv = await getGiaoVien();

        setLop(l);
        setGiaoVien(gv);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  /* =========================
     LOAD TKB
  ========================= */

  useEffect(() => {
    if (!selected) return;

    let isMounted = true;

    const fetchTKB = async () => {
      setLoading(true);

      try {
        let result = [];

        if (type === "lop") {
          result = await getTKBTheoLop(selected);
        } else {
          result = await getTKBTheoGiaoVien(selected);
        }

        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error(error);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    fetchTKB();

    return () => {
      isMounted = false;
    };
  }, [selected, type]); // ✅ CHUẨN

  /* =========================
     LẤY NỘI DUNG Ô
  ========================= */
  const getCell = (thu, tiet) => {
    const item = data.find((x) => x.thu == thu && x.tiet == tiet);

    if (!item) return "";

    if (type === "lop") {
      return (
        <div>
          <div className="font-semibold">{item.mon_hoc?.ten_mon}</div>
          <div className="text-sm text-gray-500">
            {item.giao_vien?.ten_giao_vien}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="font-semibold">{item.mon_hoc?.ten_mon}</div>
          <div className="text-sm text-gray-500">{item.lop?.ten_lop}</div>
        </div>
      );
    }
  };

  return (
    <MainLayout>
      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">📅 Thời khóa biểu</h2>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        {/* chọn loại */}
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setSelected("");
            setData([]);
          }}
          className="border p-2 rounded"
        >
          <option value="lop">Theo lớp</option>
          <option value="giaovien">Theo giáo viên</option>
        </select>

        {/* chọn đối tượng */}
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Chọn --</option>

          {type === "lop" &&
            lop.map((l) => (
              <option key={l.ma_lop} value={l.ma_lop}>
                {l.ten_lop}
              </option>
            ))}

          {type === "giaovien" &&
            giaoVien.map((gv) => (
              <option key={gv.ma_giao_vien} value={gv.ma_giao_vien}>
                {gv.ten_giao_vien}
              </option>
            ))}
        </select>
      </div>

      {/* LOADING */}
      {loading && <p className="text-blue-500 mb-4">Đang tải dữ liệu...</p>}

      {/* TABLE */}
      <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="p-3">Tiết / Thứ</th>
            {[2, 3, 4, 5, 6, 7].map((thu) => (
              <th key={thu} className="p-3">
                Thứ {thu}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((tiet) => (
            <tr key={tiet} className="text-center">
              <td className="p-3 bg-gray-100 font-semibold">Tiết {tiet}</td>

              {[2, 3, 4, 5, 6, 7].map((thu) => (
                <td key={thu} className="border p-2 h-20 hover:bg-blue-50">
                  {getCell(thu, tiet)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default ThoiKhoaBieu;
