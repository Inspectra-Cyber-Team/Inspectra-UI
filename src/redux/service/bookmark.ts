import { cyberApi } from "../api";

const bookmarkApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: `/bookmarks?page=${page}&size=${pageSize}`,
      }),
      providesTags: [{ type: "Bookmark", id: "Bookmark" }],
    }),

    createBookmark: builder.mutation<any, { blogUuid: string }>({
      query: ({ blogUuid }) => ({
        url: `/bookmarks`,
        method: "POST",
        body: { blogUuid },
      }),
      invalidatesTags: [{ type: "Bookmark", id: "Bookmark" }],
    }),

    deleteBookmark: builder.mutation<any, { blogUuid: string }>({
      query: ({ blogUuid }) => ({
        url: `/bookmarks/${blogUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Bookmark", id: "Bookmark" }],
    }),
  }),
});

export const {
  useGetBookmarksQuery,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} = bookmarkApi;
