import service from "..";

const wishListApi = service.wishListApi.injectEndpoints({
  endpoints: (build) => ({
    wish: build.mutation({
      query: ({ data }) => ({
        url: `/wish_list/`,
        method: "POST",
        body: { json_data: data },
      }),
    }),
    getWish: build.query({
      query: () => ({
        url: `/wish_list/`,
        method: "GET",
      }),
    }),
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
