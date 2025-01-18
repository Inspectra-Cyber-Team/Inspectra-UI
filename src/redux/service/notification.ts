import { cyberApi } from "../api";

const notificationApi = cyberApi.injectEndpoints({
endpoints: (builder) => ({
    // get user feedback
    getAllNotification: builder.query<any,{  page: number;size: number; }>({
    query: ({ page, size }) => ({
        url: `/notifications?page=${page}&size=${size}`,
        method: 'GET',
    }),
}),

    markAsRead: builder.mutation<any,{  notificationUuid: string; }>({
    query: ({ notificationUuid }) => ({
        url: `/notifications/${notificationUuid}`,
        method: 'POST',
    }),
}),


}),

});

export const {
useGetAllNotificationQuery,
useMarkAsReadMutation,
} = notificationApi;