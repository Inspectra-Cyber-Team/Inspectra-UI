import { cyberApi } from "@/redux/api";

export const issueApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getAllIssue: builder.query<
      any,
      {
        projectName: string;
        page: number;
        size: number;
        languages: string;
        tags: string;
        files: string;
        directories: string;
        impactSeverities: string;
        rules: string;
        cleanCodeAttributeCategories: string;
      }
    >({
      query: ({
        projectName,
        page,
        size,
        languages,
        tags,
        files,
        directories,
        impactSeverities,
        rules,
        cleanCodeAttributeCategories,
      }) => ({
        url: `/issues?projectName=${projectName}&page=${page}&size=${size}&languages=${languages}&tags=${tags}&files=${files}&directories=${directories}&impactSeverities=${impactSeverities}&rules=${rules}&cleanCodeAttributeCategories=${cleanCodeAttributeCategories}`,
      }),
    }),
    getIssueDetail: builder.query<any, { projectKey: string }>({
      query: ({ projectKey }) => ({
        url: `issues/${projectKey}`,
      }),
    }),
    getSourcesIssue: builder.query<any, { projectKey: string }>({
      query: ({ projectKey }) => ({
        url: `sources/${projectKey}`,
      }),
    }),
  }),
});

export const {
  useGetAllIssueQuery,
  useGetIssueDetailQuery,
  useGetSourcesIssueQuery,
} = issueApi;
