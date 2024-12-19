import { cyberApi } from "../api";

export const fileApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadFile: builder.mutation<any, { file: object }>({
      query: ({ file }) => ({
        url: `files/multiple`,
        method: "POST",
        body: file,
      }),
    }),
    uploadSingleFile: builder.mutation<any, { file: object }>({
      query: ({ file }) => ({
        url: `files`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const { useUploadFileMutation , useUploadSingleFileMutation} = fileApi;
