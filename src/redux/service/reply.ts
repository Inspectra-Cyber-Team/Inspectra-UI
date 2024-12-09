

import { cyberApi } from "@/redux/api";

export const replyApi = cyberApi.injectEndpoints({

    endpoints: (builder) => ({

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reply: builder.mutation<any,  { data:object }>({
            query: ({ data }) => ({
                url: `/replies`,
                method: "POST",
                body: data ,
            }),
        }),
    }),
}
);

export const { useReplyMutation} = replyApi;