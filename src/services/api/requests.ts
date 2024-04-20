import axios from "axios";

export const client = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export interface ICarPrice {
  mark: string;
  model: string;
  year: number;
  mileage: number;
  voleng: number;
  fuel: string;
}

export const requests = {
  getInventory: async (params: ICarPrice) => {
    const response = await client({
      url: `/carprice/${params.mark}/${params.model}/${params.year}/${params.mileage}/${params.voleng}/${params.fuel}`,
      method: "GET",
    });

    return response;
  },
};
