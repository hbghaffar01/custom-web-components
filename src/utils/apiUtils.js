const baseURL = "https://teralead-backend.vercel.app";

const getAuthToken = () => localStorage.getItem("token");

const redirectToLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${baseURL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        console.warn("Token expired or unauthorized, redirecting to login.");
        redirectToLogin();
        return;
      }

      const errorData = await response.json();
      console.error("Request failed:", errorData.message);
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  const payload = { username, email, password };
  return fetchWithAuth("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (username, email, password) => {
  const payload = { username, email, password };
  if (!username) delete payload.username;
  if (!email) delete payload.email;

  return fetchWithAuth("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  });
};

export const getUser = async () => fetchWithAuth("/api/protected/user");

export const createOrder = async (orderData) =>
  fetchWithAuth("/api/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });

export const getAllProducts = async () => fetchWithAuth("/api/orders/list");

export const addToCart = async (cartData) =>
  fetchWithAuth("/api/cart/add-to-cart", {
    method: "POST",
    body: JSON.stringify(cartData),
  });

export const getCartsProducts = async () => fetchWithAuth("/api/cart/get/cart");

export const deleteCart = async (productId) =>
  fetchWithAuth("/api/cart/delete-from-cart", {
    method: "DELETE",
    body: JSON.stringify(productId),
  });

export const deleteProduct = async (productId) =>
  fetchWithAuth(`/api/orders/delete/${productId}`, {
    method: "DELETE",
  });

export const getCoupons = async () => fetchWithAuth("/api/coupons");
