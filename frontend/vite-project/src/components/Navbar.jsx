function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-lg font-bold">Hệ thống quản lý giáo viên</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Navbar;
