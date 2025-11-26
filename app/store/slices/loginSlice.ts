// store/slices/loginSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = (Config.API_URL || '').replace(/\/+$/, '');

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
  about?: string;
  location?: string;
  attachment_url?: string;
}

export const loginSlice = createApi({
  reducerPath: 'loginSlice',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) headers.set('x-auth-token', token);
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/logiN-IT',
        method: 'POST',
        body,
      }),
    }),

    getAllUsersIt: builder.query<UserDto[], void>({
      query: () => ({ url: '/get-all-user-IT', method: 'GET' }),
      transformResponse: (res: { data: UserDto[] }) => res.data,
      providesTags: result =>
        result
          ? [
              ...result.map(u => ({ type: 'User' as const, id: u._id })),
              { type: 'User' as const, id: 'LIST' },
            ]
          : [{ type: 'User' as const, id: 'LIST' }],
    }),

    // IMPORTANT: accept { userId, data } and RETURN the object
    editUser: builder.mutation<
      UserDto,
      { userId: string; data: FormData | Record<string, any> }
    >({
      query: ({ userId, data }) => ({
        url: `/edit-user/${userId}`, // keep leading slash
        method: 'PUT',
        body: data, // do NOT set Content-Type manually for FormData
      }),
      invalidatesTags: (r, e, { userId }) => [
        { type: 'User', id: userId },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAllUsersItQuery,
  useEditUserMutation, // <- make sure this is exported
} = loginSlice;
