import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-500 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Quản Lý Giáo Viên</h2>

      <ul className="space-y-3">
        <li>
          <Link to="/dashboard">Trang chủ</Link>
        </li>

        <li>
          <Link to="/giaovien">Giáo viên</Link>
        </li>

        <li>
          <Link to="/tochuyenmon">Tổ chuyên môn</Link>
        </li>

        <li>
          <Link to="/phancong">Phân công</Link>
        </li>

        <li>
          <Link to="/thoikhoabieu">Thời khóa biểu</Link>
        </li>

        <li>
          <Link to="/thongke">Thống kê</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
