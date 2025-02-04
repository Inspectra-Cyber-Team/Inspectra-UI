

import { cyberApi } from "../api";

export const bannerApi = cyberApi.injectEndpoints({ 

    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => ({
                url: "banners?page=0&size=1",
                method: "GET",
            }),
            providesTags: [{ type: "Banner", id: "Banner" }],
        }),
    }),

})

export const { useGetBannerQuery } = bannerApi;