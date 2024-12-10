import { cyberApi } from "../api"

export const securityApi = cyberApi.injectEndpoints ({
    endpoints: (build) => ({
        getSecurityHotspot: build.query<any,{projectName:string}>({
        
        query: ({projectName}) => ({
            url: `projects/security-hotspot/${projectName}`
        })
        }),
    }),
})

export const { useGetSecurityHotspotQuery } = securityApi