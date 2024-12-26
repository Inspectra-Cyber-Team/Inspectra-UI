import { cyberApi } from "@/redux/api";

export const faqApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user feedback
    getAllFAQ: builder.query({
      query: () => ({
        url: `/faqs`,
      }),
    }),
    uploadFile: builder.mutation<any, { file: FormData }>({
      query: ({ file }) => ({
        url: `files`,
        method: "POST",
        body: file,
      }),
    }),
    uploadMultipleFile: builder.mutation<any, { file: object }>({
      query: ({ file }) => ({
        url: `files/multiple`,
        method: "POST",
        body: file,
      }),
    }),
  }),
});

export const {
  useGetAllFAQQuery,
  useUploadFileMutation,
  useUploadMultipleFileMutation,
} = faqApi;
