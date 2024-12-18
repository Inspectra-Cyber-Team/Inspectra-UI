// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "./store";

import { setAccessToken } from "@/redux/feature/Auth/authSlice";
// initialize an empty api service that we'll inject endpoints into later as needed


// Setting up prepareHeaders to include the token in the headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    console.log("Token", token);

    // if we have a token, let's set the authorization header
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (res.ok) {
      const data = await res.json();
      api.dispatch(setAccessToken(data?.accessToken)); // Dispatch the new token
      // Re-run the query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}logout`, {
        method: "POST",
        credentials: "include",
      });
    }
  }

  return result;
};

export const cyberApi = createApi({
  reducerPath: "cyberApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Feedbacks", "Projects", "User"],
  endpoints: () => ({}),
});
