import { cyberApi } from "@/redux/api"

export const codeApi = cyberApi.injectEndpoints({
    endpoints: (builder) => ({
        getCode: builder.query<any,{projectName:string,page:number,size:number}>({
        
            query: ({ projectName, page, size }) => 
                `codes/component-tree/${projectName}?page=${page}&size=${size}`,
        }),
    }),
    })

export const { useGetCodeQuery } = codeApi;    