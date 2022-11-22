import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useItems = () =>
  useQuery(
    ["items"],
    async () => {
      return await axios.get("/api/item/list");
    },
    {
      enabled: true,
      onSuccess: (res, variable) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };

        return result;
      },
      onError: (err) => {
        console.error(err.response?.data || err);
      },
    }
  );
