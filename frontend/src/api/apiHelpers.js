import { API_BASE_URL } from "./apiClient";

export const buildMediaUrl = (path) => {
  if (!path) return undefined;
  return `${API_BASE_URL.replace(/\/api\/$/, "")}${path}`;
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "—";
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};
