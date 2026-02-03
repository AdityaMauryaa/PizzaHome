import api from "./api";

export const placeOrder = () =>
  api.post("/orders");

export const getUserOrders = () =>
  api.get("/orders");

export const getOrderById = (orderId) =>
  api.get(`/orders/${orderId}`);
