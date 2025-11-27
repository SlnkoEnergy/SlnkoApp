
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";


export interface DprItem {
  _id: string;
  activity_id?: { _id: string; name: string };
  project_id?: { _id: string; name?: string; code?: string };
  percent_complete?: number; // e.g. 80
  work_completion?: { unit?: "percentage" | string; value?: number };
  [key: string]: any;
}

export interface GetAllDprResponse {
  data: DprItem[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface GetAllDprArgs {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
}

export interface UpdateDprLogArgs {
  projectId: string;
  activityId: string;
  todays_progress: string | number;
  date: string;
  remarks?: string;
  status: string;
}

const baseUrl = (Config.API_URL || "").replace(/\/+$/, "");

export const dprSlice = createApi({
  reducerPath: "dprSlice",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) headers.set("x-auth-token", token);
      return headers;
    },
  }),
  tagTypes: ["Project"],

  endpoints: (builder) => ({
    getAllDpr: builder.query<GetAllDprResponse, GetAllDprArgs>({
      query: ({ page = 1, limit = 10, search = "", projectId } = {}) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search) params.set("search", search);
        if (projectId) params.set("projectId", projectId);

        return { url: `dpr/dpr?${params.toString()}`, method: "GET" };
      },
      providesTags: ["Project"],
    }),

    updateDprLog: builder.mutation({
      query: ({
        id,
        todays_progress,
        date,
        remarks,
        status,
      }) => (

        {
          url: `dpr/${id}/updateStatus`,
          method: "PATCH",
          body: {
            todays_progress,
            date,
            remarks,
            status,
          },
        }),
      invalidatesTags: ["Project"],
    }),

    getAllDprStatus: builder.query<DprStatusResponse, void>({
      query: () => ({
        url: "dpr/dpr-status",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

  }),
});

export const {

  useGetAllDprQuery,
  useUpdateDprLogMutation,
  useGetAllDprStatusQuery,

} = dprSlice;
