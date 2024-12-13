import { cyberApi } from "@/redux/api";

export const overviewApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getProjectDetail: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
        url: `projects/details?projectName=${projectName}`,
      }),
    }),

    // get qualtity gate
    getQualityGate: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
        url: `quality-gates/${projectName}`,
      }),
    }),
  }),
});

export const {  useGetProjectDetailQuery, useGetQualityGateQuery } = overviewApi;
