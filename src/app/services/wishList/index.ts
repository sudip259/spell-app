import service from "..";

// inject wishList endpoints with REACT_APP_WATCH_LATER_URL env
const wishListApi = service.wishListApi.injectEndpoints({
  endpoints: (build) => ({
    // useWishMutation
    wish: build.mutation({
      query: ({ data }) => ({
        url: `/wish_list/`,
        method: "POST",
        body: { json_data: data },
      }),
    }),
    // useGetWishQuery
    getWish: build.query({
      query: () => ({
        url: `/wish_list/`,
        method: "GET",
      }),
    }),
    // useRemoveWishMutation
    removeWish: build.mutation({
      query: (id) => ({
        url: `/wish_list/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useWishMutation, useGetWishQuery, useRemoveWishMutation } =
  wishListApi;
