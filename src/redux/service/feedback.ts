import { cyberApi } from "@/redux/api";
import { createFeedbackType } from "@/types/Feedback";

export const feedbackApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({
    // create user feedback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createUserFeedback: builder.mutation<any, { message: createFeedbackType }>({
      query: ({ message }) => ({
        url: `feedbacks`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: [{ type: "Feedbacks", id: "FEEDBACKLIST" }],
    }),
    // get user feedback
    getAllUserFeedback: builder.query({
      query: () => ({
        url: `feedbacks/all`,
      }),
      providesTags: [{ type: "Feedbacks", id: "FEEDBACKLIST" }],
    }),
  }),
});

export const { useCreateUserFeedbackMutation, useGetAllUserFeedbackQuery } =
  feedbackApi;
