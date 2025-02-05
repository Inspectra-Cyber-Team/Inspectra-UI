import { cyberApi } from "@/redux/api";

export const chatApi = cyberApi.injectEndpoints({

     endpoints: (builder) => ({

        getAllSessions: builder.query({

            query: () => ({

                url: `chat-session`,
                method: "GET",

            }),

            providesTags: [{ type: "ChatSession", id: "ChatSession" }],

        }),
        
        getAllMessageBySessionUuid: builder.query<any,{ sessionUuid: string }>({
            query: ({ sessionUuid }) => ({
                url: `chat-session/ai-cache/${sessionUuid}`,
                method: "GET",
            }),
            providesTags: [{ type: "ChatSession", id: "ChatSession" }],
        }),

        createSession: builder.mutation({
            query: () => ({
                url: `chat-session`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "ChatSession", id: "ChatSession" }],
        }),

        createMessage: builder.mutation<any,{message: object }>({
            query: ({ message }) => ({
                url: `chat-session/ai-cache`,
                method: "POST",
                body:  message ,
            }),
            // invalidatesTags: [{ type: "ChatSession", id: "ChatSession" }],
        }),

        deleteSession: builder.mutation<any,{ sessionUuid: string }>({
            query: ({ sessionUuid }) => ({
                url: `chat-session/delete/${sessionUuid}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "ChatSession", id: "ChatSession" }],
        }),
        

     })

});

export const 
    {
        useGetAllSessionsQuery,
        useGetAllMessageBySessionUuidQuery,
        useCreateSessionMutation,
        useCreateMessageMutation,
        useDeleteSessionMutation,
    } = chatApi;