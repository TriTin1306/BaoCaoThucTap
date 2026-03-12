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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full border p-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
