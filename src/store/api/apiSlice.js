import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Cart', 'Posts'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 20, skip = 0, category, sortBy, order }) => {
        let url = '/products';
        if (category && category !== 'all') {
          url = `/products/category/${category}`;
        }

        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (skip) params.append('skip', skip);
        if (sortBy) params.append('sortBy', sortBy);
        if (order) params.append('order', order);

        return `${url}?${params.toString()}`;
      },
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    searchProducts: builder.query({
      query: (q) => `/products/search?q=${q}`,
    }),
    getCategories: builder.query({
      query: () => '/products/categories',
      transformResponse: (response) => {
        if (Array.isArray(response) && typeof response[0] === 'object') {
          return response.map((c) => c.slug || c.name);
        }
        return response;
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/users/add',
        method: 'POST',
        body: userData,
      }),
    }),
    addCart: builder.mutation({
      query: (cartData) => ({
        url: '/carts/add',
        method: 'POST',
        body: cartData,
      }),
    }),
    getUserOrders: builder.query({
      query: (userId) => `/carts/user/${userId}`,
    }),
    getPosts: builder.query({
      query: ({ limit = 10, skip = 0 }) => `/posts?limit=${limit}&skip=${skip}`,
      providesTags: ['Posts'],
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useAddCartMutation,
  useGetUserOrdersQuery,
  useGetPostsQuery,
  useGetPostQuery,
} = apiSlice;
