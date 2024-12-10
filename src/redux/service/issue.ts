import { cyberApi } from "@/redux/api";

export const issueApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getAllIssue: builder.query<any,{projectName: string, page: number, size: number }>({
      query: ({projectName, page, size}) => ({
        url: `/issues?projectName=${projectName}&page=${page}&size=${size}`,
      }),
    }),
  }),
});

export const {  useGetAllIssueQuery } = issueApi;
