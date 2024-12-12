import { cyberApi } from "@/redux/api";

export const issueApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getAllIssue: builder.query<any,{projectName: string, page: number, size: number, languages: string ,tags: string, files:string, directories: string, impactSeverities: string}>({
      query: ({projectName, page, size, languages, tags, files, directories, impactSeverities}) => ({
        url: `/issues?projectName=${projectName}&page=${page}&size=${size}&languages=${languages}&tags=${tags}&files=${files}&directories=${directories}&impactSeverities=${impactSeverities}`,
      }),
    }),
  }),
});

export const {  useGetAllIssueQuery } = issueApi;
