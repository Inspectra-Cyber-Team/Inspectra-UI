

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
    }),
});


export const { useCreateCommentMutation, useGetCommentByBlogUuidQuery } = commentApi;