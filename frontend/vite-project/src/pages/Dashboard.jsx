function Dashboard() {
  const handleLogout = () => {
    try {
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Hệ thống quản lý giáo viên</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Đăng xuất
        </button>
      </div>

      <div>
        <p>Chào mừng bạn đến Dashboard</p>
      </div>
    </div>
  );
}

export default Dashboard;
