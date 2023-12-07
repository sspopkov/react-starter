import axios from "axios";

export const client = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export const requests = {
  getInventory: async () =>
    await client({
      url: "/store/inventory",
      method: "GET",
    }),
};
