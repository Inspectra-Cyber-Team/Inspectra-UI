import { cyberApi } from "@/redux/api";

export const overviewApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getProjectDetail: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
        url: `projects/details?projectName=${projectName}`,
      }),
    }),
  }),
});

export const {  useGetProjectDetailQuery } = overviewApi;