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

// CRUD TỔ CHUYÊN MÔN
/* =================================
   6️⃣ LẤY DANH SÁCH TỔ CHUYÊN MÔN
================================= */
export const getToChuyenMon = async () => {
  const response = await fetch(`${API_URL}/tochuyenmon`);
  return response.json();
};

/* =================================
   7️⃣ THÊM TỔ CHUYÊN MÔN
================================= */
export const createToChuyenMon = async (data) => {
  const response = await fetch(`${API_URL}/tochuyenmon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   8️⃣ CẬP NHẬT TỔ CHUYÊN MÔN
================================= */
export const updateToChuyenMon = async (id, data) => {
  const response = await fetch(`${API_URL}/tochuyenmon/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   9️⃣ XÓA TỔ CHUYÊN MÔN
================================= */
export const deleteToChuyenMon = async (id) => {
  const response = await fetch(`${API_URL}/tochuyenmon/${id}`, {
    method: "DELETE",
  });

  return response.json();
};

// CRUD PHÂN CÔNG
/* =================================
   🔟 LẤY DANH SÁCH PHÂN CÔNG
================================= */
export const getAllPhanCong = async () => {
  const response = await fetch(`${API_URL}/phancong`);
  return response.json();
};

/* =================================
   1️⃣1️⃣ THÊM PHÂN CÔNG
================================= */
export const createPhanCong = async (data) => {
  const response = await fetch(`${API_URL}/phancong`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   1️⃣2️⃣ CẬP NHẬT PHÂN CÔNG
================================= */
export const updatePhanCong = async (id, data) => {
  const response = await fetch(`${API_URL}/phancong/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* =================================
   1️⃣3️⃣ XÓA PHÂN CÔNG
================================= */
export const deletePhanCong = async (id) => {
  const response = await fetch(`${API_URL}/phancong/${id}`, {
    method: "DELETE",
  });

  return response.json();
};

/* =================================
   LẤY DANH SÁCH MÔN HỌC
================================= */
export const getMonHoc = async () => {
  const response = await fetch(`${API_URL}/monhoc`);
  return response.json();
};

/* =================================
   LẤY DANH SÁCH LỚP
================================= */
export const getLop = async () => {
  const response = await fetch(`${API_URL}/lophoc`);
  return response.json();
};
