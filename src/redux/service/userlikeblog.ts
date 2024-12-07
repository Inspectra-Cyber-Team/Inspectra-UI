import { cyberApi } from "../api";

export const userLikeBlogApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserLikeBlog: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `user_like_blog/${uuid}`,
      }),
    }),
  }),
});

export const { useGetUserLikeBlogQuery } = userLikeBlogApi;