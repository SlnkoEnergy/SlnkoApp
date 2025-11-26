import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

const baseUrl = (Config.API_URL || '').replace(/\/+$/, '');

export const expenseSlice = createApi({
  reducerPath: "expenseSlice",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) headers.set("x-auth-token", token);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllProjectsIT: builder.query<any, void>({
      query: () => "get-all-projecT-IT",
    }),
  }),
});

export const { useGetAllProjectsITQuery } = expenseSlice;