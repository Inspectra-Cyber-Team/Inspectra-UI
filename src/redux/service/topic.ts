import { cyberApi } from "../api";

export const topicApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllTopic: builder.query<
      any,
      { topicName: string; page: number; pageSize: number }
    >({
      query: ({ topicName, page, pageSize }) => ({
        url: `/topics/${topicName}?page=${page}&size=${pageSize}`,
      }),
    }),
  }),
});

export const { useGetAllTopicQuery } = topicApi;
