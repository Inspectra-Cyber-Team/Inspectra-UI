import { cyberApi } from "../api"

export const scourceApi = cyberApi.injectEndpoints ({

    endpoints: (build) => ({
        getSouce: build.query<any,{issueKey:string}>({
        query: ({issueKey}) => ({
            url: `sources/${issueKey}`
        }),
    }),
    })
})

export const { useGetSouceQuery } = scourceApi;