import { cyberApi } from "../api";

export const authApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: builder.mutation<any, { data: object }>({
      query: ({ data }) => ({
        url: `auth/login/`,
        method: "POST",
        body: data,
      }),
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: builder.mutation<any, { user: object }>({
      query: ({ user }) => ({
        url: `auth/register`,
        method: "POST",
        body: user,
      }),
    }),

    chnagePassword: builder.mutation<any, { data: object }>({
      query: ({ data }) => ({
        url: `auth/change-password`,
        method: "PUT",
        body: data,
      }),
    }),

    requestPasswordReset: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: `auth/request-reset-password?email=${email}`,
        method: "PUT",
      }),
    }),

    resetPassword: builder.mutation<any, { data: object }>({
      query: ({ data }) => ({
        url: `auth/reset-password`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChnagePasswordMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = authApi;
