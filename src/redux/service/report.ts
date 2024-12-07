
import { cyberApi } from "@/redux/api";

export const reportApi = cyberApi.injectEndpoints({

    endpoints: (builder) => ({

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        report: builder.mutation<any,  { report:object }>({
            query: ({ report }) => ({
                url: `/reports`,
                method: "POST",
                body: report ,
            }),
        }),
    }),
}
);

export const { useReportMutation } = reportApi;