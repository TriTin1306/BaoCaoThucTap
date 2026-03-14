const API_URL = "http://localhost:3000/api";

/* =================================
   1️⃣ LOGIN
================================= */
export const login = async (ten_dang_nhap, mat_khau) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ten_dang_nhap,
        mat_khau,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API login error:", error);
    throw error;
  }
};

/* =================================
   2️⃣ LẤY DANH SÁCH GIÁO VIÊN
================================= */
export const getGiaoVien = async () => {
  const response = await fetch(`${API_URL}/giaovien`);
  return response.json();
};

/* =================================
   3️⃣ THÊM GIÁO VIÊN
================================= */
export const createGiaoVien = async (data) => {
  const response = await fetch(`${API_URL}/giaovien`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   4️⃣ CẬP NHẬT GIÁO VIÊN
================================= */
export const updateGiaoVien = async (id, data) => {
  const response = await fetch(`${API_URL}/giaovien/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   5️⃣ XÓA GIÁO VIÊN
================================= */
export const deleteGiaoVien = async (id) => {
  const response = await fetch(`${API_URL}/giaovien/${id}`, {
    method: "DELETE",
  });

  return response.json();
};
