// src/store/dprSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

export interface DprItem {
  _id: string;
  project_id?: string;
  [key: string]: any;
}

export interface GetAllDprResponse {
  data: DprItem[];
  total?: number;
  page?: number;
  limit?: number;
  [key: string]: any;
}

export interface GetAllDprArgs {
  page?: number;
  limit?: number;
  search?: string;
  projectId?: string;
  from?: string;
  to?: string;
  onlyWithDeadline?: string | boolean;
  status?: string;
  category?: string;
  hide_status?: string;
}

export interface UpdateDprLogArgs {
  projectId: string;
  activityId: string;
  todays_progress: string | number;
  date: string;
  remarks?: string;
  status: string;
}

const baseUrl = (Config.API_URL || '').replace(/\/+$/, '');

export const dprSlice = createApi({
  reducerPath: "dprSlice",

  // 🔥 Add token automatically for ALL DPR APIs
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

  tagTypes: ["Project"],

  endpoints: (builder) => ({
    getAllDpr: builder.query<GetAllDprResponse, GetAllDprArgs>({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        projectId,
        from,
        to,
        onlyWithDeadline,
        status,
        category,
        hide_status,
      }) => {
        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(limit));

        if (projectId) params.set("projectId", projectId);
        if (search) params.set("search", search);
        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (onlyWithDeadline)
          params.set("onlyWithDeadline", String(onlyWithDeadline));
        if (status) params.set("status", status);
        if (category) params.set("category", category);
        if (hide_status) params.set("hide_status", hide_status);

        return {
          url: `projectActivity/alldpr?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),

    updateDprLog: builder.mutation<any, UpdateDprLogArgs>({
      query: ({
        projectId,
        activityId,
        todays_progress,
        date,
        remarks,
        status,
      }) => ({
        url: `projectactivity/${projectId}/updateDprLog/${activityId}`,
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
  }),
});

export const { useGetAllDprQuery, useUpdateDprLogMutation } = dprSlice;
