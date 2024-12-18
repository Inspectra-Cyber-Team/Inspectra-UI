

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
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getCommentByBlogUuid: builder.query<any,{uuid:string,page:number,size:number}>({
            query: ({uuid,page,size}) => ({
                url: `/comments/${uuid}/blog?page=${page}&size=${size}`,
                method: "GET",
            }),
            providesTags:[{type:"Comment",id:"CommentList"}]
        }),

        createLikeComment: builder.mutation<any,  { commentUuid:string }>({
            query: ({ commentUuid }) => ({
                url: `/comments/${commentUuid}/like`,
                method: "POST",
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

        editComment: builder.mutation<any,  {uuid:string, content:string }>({
            query: ({ uuid,content }) => ({
                url: `/comments/${uuid}`,
                method: "PUT",
                body: {content} ,
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

        deleteComment: builder.mutation<any,  {uuid:string }>({
            query: ({ uuid }) => ({
                url: `/comments/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),



        reply: builder.mutation<any,  { data:object }>({
            query: ({ data }) => ({
                url: `/replies`,
                method: "POST",
                body: data ,
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

        likeReply: builder.mutation<any,  { replyUuid:string }>({
            query: ({ replyUuid }) => ({
                url: `/replies/${replyUuid}/like`,
                method: "POST",
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

        editReply: builder.mutation<any,  {uuid:string, content:string }>({
            query: ({ uuid,content }) => ({
                url: `/replies/${uuid}/reply`,
                method: "PUT",
                body: {content} ,
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),

        deleteReply: builder.mutation<any,  {uuid:string }>({
            query: ({ uuid }) => ({
                url: `/replies/${uuid}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type:"Comment",id:"CommentList"}]
        }),
     
    }),
});


export const { useCreateCommentMutation,
     useGetCommentByBlogUuidQuery, 
     useCreateLikeCommentMutation, 
     useEditCommentMutation,
     useDeleteCommentMutation, 
     useReplyMutation,
      useLikeReplyMutation,
      useEditReplyMutation,
      useDeleteReplyMutation
     } = commentApi;