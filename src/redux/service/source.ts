import { cyberApi } from "../api"

export const scourceApi = cyberApi.injectEndpoints ({

    endpoints: (build) => ({
        getSouce: build.query<any,{issueKey:string}>({
        query: ({issueKey}) => ({
            url: `sources/${issueKey}`
        }),
    }),

        getSourceCodeByLine: build.query<any,{componetKey:string}>({
            query: ({componetKey}) => ({
                url: `sources/lines/${componetKey}`
            })
  
    })

}),

})

export const { useGetSouceQuery , useGetSourceCodeByLineQuery} = scourceApi;