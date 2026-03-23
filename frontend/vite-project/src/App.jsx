import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GiaoVien from "./pages/GiaoVien";
import PrivateRoute from "./components/PrivateRoute";
import ToChuyenMon from "./pages/ToChuyenMon";
import PhanCong from "./pages/PhanCong";
import ThoiKhoaBieu from "./pages/ThoiKhoaBieu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/giaovien"
          element={
            <PrivateRoute>
              <GiaoVien />
            </PrivateRoute>
          }
        />
        <Route
          path="/tochuyenmon"
          element={
            <PrivateRoute>
              <ToChuyenMon />
            </PrivateRoute>
          }
        />
        <Route
          path="/phancong"
          element={
            <PrivateRoute>
              <PhanCong />
            </PrivateRoute>
          }
        />
        <Route
          path="/thoikhoabieu"
          element={
            <PrivateRoute>
              <ThoiKhoaBieu />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
