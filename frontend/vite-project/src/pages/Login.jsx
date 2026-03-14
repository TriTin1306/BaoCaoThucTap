import { useState } from "react";
import { login } from "../api/api.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/dashboard";
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      console.error(error);
      alert("Không kết nối được server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      <form
        onSubmit={handleLogin}
        className="bg-white w-96 p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Đăng Nhập
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Tên Đănh Nhập</label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Mật Khẩu</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
