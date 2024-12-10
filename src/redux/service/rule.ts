import { cyberApi } from "../api"

export const ruleApi = cyberApi.injectEndpoints ({

    endpoints: (builder) => ({
        getRulesByRuleName: builder.query<any, { ruleName: string }>({
            query: ({ ruleName }) => ({
                url: `/rules/${ruleName}`,
                method: "GET",
            }),
        }),
    })

})

export const { useGetRulesByRuleNameQuery } = ruleApi;