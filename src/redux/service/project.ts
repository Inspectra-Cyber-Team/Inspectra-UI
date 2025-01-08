import { cyberApi } from "@/redux/api";

export const projectAPI = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // create user Project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectName: builder.mutation<any, { projectName: string }>({
      query: ({ projectName }) => ({
        url: `projects`,
        method: "POST",
        body: projectName,
      }),
      invalidatesTags: [{ type: "Projects", id: "PRJECTLIST" }],
    }),

    // scan project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectScan: builder.mutation<any, { project: object }>({
      query: ({ project }) => ({
        url: `scan`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Projects", id: "PRJECTLIST" }],
    }),

    // scan project for none user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectScanNonUser: builder.mutation<any, { project: object }>({
      query: ({ project }) => ({
        url: `scan/non-user`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: [{ type: "Projects", id: "PRJECTLIST" }],
    }),

    // get user Project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProjectOverViewUser: builder.query<any, { uuid: string ,page: number, size: number }>({
      query: ({ uuid , page, size }) => ({
        url: `/projects/user/${uuid}?page=${page}&size=${size}`,
      }),
      providesTags: [{ type: "Projects", id: "PRJECTLIST" }],
    }),

    // delete project by name
    deleteProject: builder.mutation<any, { projectName: string }>({
      query: ({ projectName }) => ({
        url: `projects/${projectName}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Projects", id: "PRJECTLIST" }],
    }),
  }),
});

export const {
  useCreateProjectNameMutation,
  useCreateProjectScanMutation,
  useGetProjectOverViewUserQuery,
  useDeleteProjectMutation,
  useCreateProjectScanNonUserMutation,
} = projectAPI;
