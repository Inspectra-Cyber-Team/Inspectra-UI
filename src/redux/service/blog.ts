import { cyberApi } from "@/redux/api";

export const blogApi = cyberApi.injectEndpoints({
  endpoints: (builder) => ({

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllBlog: builder.query<any,{ page: number; pageSize: number }>({
        query: ({ page = 1, pageSize = 10 }) =>
        ({
            url: `/blogs/verified?page=${page}&size=${pageSize}`,
        }),
        providesTags: [{ type: "Blog", id: "Blog" }],
      }),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    likeBlog: builder.mutation<any,{uuid:string }>({
        query: ({uuid}) => ({
            url: `/blogs/${uuid}/like`,
            method: "POST",
        }),
    }),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBlogDetails: builder.query<any,{uuid:string}>({
        query: ({uuid}) => ({
            url: `/blogs/${uuid}`,
            method: "GET",
        }),
      
    }),

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
     getBlogByUserUuid: builder.query<any,{uuid:string,page:number,size:number}>({
        query: ({uuid,page,size}) => ({
            url: `/blogs/user/${uuid}?page=${page}&size=${size}`,
            method: "GET",
        }),
        
     }),


    createBlog: builder.mutation<any, { title: string, description: string, topic: string, thumbnail: string }>({
        query: ({ title, description, topic, thumbnail }) => ({
            url: `blogs`,
            method: "POST",
            body: { title, description, topic, thumbnail },
        }),
        invalidatesTags: [{ type: "Blog", id: "Blog" }],
    }),

    updateBlog: builder.mutation<any, { uuid: string, title: string, description: string, topic: string, thumbnail: string }>({
        query: ({ uuid, title, description,thumbnail }) => ({
            url: `blogs/${uuid}`,
            method: "PUT",
            body: { title, description,thumbnail },
        }),
        invalidatesTags: [{ type: "Blog", id: "Blog" }],
    }),

    getBlogByUuid: builder.query<any, { uuid: string }>({
        query: ({ uuid }) => ({
            url: `blogs/${uuid}`,
            method: "GET",
        }),
    }),

    deleteBlog: builder.mutation<any, { uuid: string }>({
        query: ({ uuid }) => ({
          url: `blogs/${uuid}`,
          method: "DELETE",
        }),
  
        invalidatesTags: [{ type: "Blog", id: "Blog" }],
      }),


  }),
});

export const {  useGetAllBlogQuery, useLikeBlogMutation, useGetBlogDetailsQuery, useGetBlogByUserUuidQuery, useCreateBlogMutation, useUpdateBlogMutation, useGetBlogByUuidQuery , useDeleteBlogMutation} = blogApi;
