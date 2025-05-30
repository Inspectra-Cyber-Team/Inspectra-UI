import { cyberApi } from "@/redux/api";


export const overviewApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getProjectDetail: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
        url: `projects/details?projectName=${projectName}`,
      }),
    }),
    
    getExportPdf: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
      url: `pdf/${projectName}`,
      }),
    }),
    
    // get project by user uuid
    getProjectByUserUuid: builder.query<any,{uuid: string}>({
      query: ({uuid}) => ({
        url: `projects/user/${uuid}`,
      }),
    }),

    getProjectOverviewUser: builder.query<any,{projectName: string}>({
      query: ({projectName}) => ({
        url: `projects/overview/${projectName}`,
      }),
    }),
  }),
});

export const { useGetProjectDetailQuery, useGetExportPdfQuery , useGetProjectByUserUuidQuery, useGetProjectOverviewUserQuery } = overviewApi;
