const API_URL = "http://localhost:3000/api";

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
