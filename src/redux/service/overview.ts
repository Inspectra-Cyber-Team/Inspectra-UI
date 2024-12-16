import { cyberApi } from "@/redux/api";
import { get } from "http";

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
    })
  }),
});

export const { useGetProjectDetailQuery, useGetExportPdfQuery , useGetProjectByUserUuidQuery } = overviewApi;
