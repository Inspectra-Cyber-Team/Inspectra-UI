import { cyberApi } from "@/redux/api";
import { ProjectNameType } from "@/types/ProjectNameType";

export const projectAPI = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // create user Project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectName: builder.mutation<any, { projectName: ProjectNameType }>({
      query: ({ projectName }) => ({
        url: `projects`,
        method: "POST",
        body: projectName,
        invalidatesTags: ["Projects"],
      }),
    }),
    // get user Project
    getAllProjectsName: builder.query({
      query: () => ({
        url: `projects`,
        providesTags: ["Projects"],
      }),
    }),

    // scan project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectScan: builder.mutation<any, { project: object }>({
      query: ({ project }) => ({
        url: `scan`,
        method: "POST",
        body: project,
        invalidatesTags: ["Projects"],
      }),
    }),

    // scan project for none user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProjectScanNonUser: builder.mutation<any, { project: object }>({
      query: ({ project }) => ({
        url: `scan/non-user`,
        method: "POST",
        body: project,
        invalidatesTags: ["Projects"],
      }),
    }),

    // get user Project
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProjectOverViewUser: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/projects/user/${uuid}`,
        providesTags: ["Projects"],
      }),
    }),

    // delete project by name
    deleteProject: builder.mutation<any, { projectName: string }>({
      query: ({ projectName }) => ({
        url: `projects/${projectName}`,
        method: "DELETE",
        invalidatesTags: ["Projects"],
      }),
    }),
  }),
});

export const {
  useCreateProjectNameMutation,
  useGetAllProjectsNameQuery,
  useCreateProjectScanMutation,
  useGetProjectOverViewUserQuery,
  useDeleteProjectMutation,
  useCreateProjectScanNonUserMutation,
} = projectAPI;
