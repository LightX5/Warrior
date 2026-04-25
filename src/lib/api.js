const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Something went wrong.");
  }

  return payload;
};

export const postBooking = (data) =>
  request("/api/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const postContactMessage = (data) =>
  request("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
