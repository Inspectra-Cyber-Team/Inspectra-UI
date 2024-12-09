

import { cyberApi } from "@/redux/api";

export const commentApi = cyberApi.injectEndpoints({

    endpoints: (builder) => ({

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createComment: builder.mutation<any,  { comment:object }>({
            query: ({ comment }) => ({
                url: `/comments`,
                method: "POST",
                body: comment ,
            }),
        }),

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getCommentByBlogUuid: builder.query<any,{uuid:string,page:number,size:number}>({
            query: ({uuid,page,size}) => ({
                url: `/comments/${uuid}/blog?page=${page}&size=${size}`,
                method: "GET",
            }),
        }),

        createLikeComment: builder.mutation<any,  { commentUuid:string }>({
            query: ({ commentUuid }) => ({
                url: `/comments/${commentUuid}/like`,
                method: "POST",
            }),
        }),
    }),
});


export const { useCreateCommentMutation, useGetCommentByBlogUuidQuery, useCreateLikeCommentMutation } = commentApi;