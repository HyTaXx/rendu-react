import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
    tagTypes: ["Products", "ProductComments"],
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://iim.etherial.fr" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `products`,
            providesTags: ["Products"],
        }),
        getProductComments: builder.query({
            query: (productId) => `products/${productId}/comments`,
            providesTags: ["ProductComments"],
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: `products/${data.productId}/comments`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ProductComments"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductCommentsQuery,
    useCreateCommentMutation,
} = productAPI;
