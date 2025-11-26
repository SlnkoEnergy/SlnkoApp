import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';


console.log("---- ENV DEBUG ----");
console.log("Config.API_URL:", Config.API_URL);
console.log("--------------------");

const baseUrl = (Config.API_URL || '').replace(/\/+$/, '');
console.log("BASE URL FROM ENV =>", baseUrl);

export interface LoginRequest {
  name: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  emp_id?: string;
  role?: string;
  department?: string;
  createdAt?: string;
}



export const loginSlice = createApi({
  reducerPath: 'loginSlice',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/logiN-IT",
        method: "POST",
        body,
      }),
    }),

    getAllUsersIt: builder.query<UserDto[], void>({
      query: () => ({
        url: "/get-all-user-IT",
        method: "GET",
      }),
      transformResponse: (response: { data: UserDto[] }) => response.data,
    }),
  }),
});


export const {
  useLoginMutation,
  useGetAllUsersItQuery,
} = loginSlice;
