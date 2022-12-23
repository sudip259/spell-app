import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "domain/axiosBaseQuery";

const nepApi = createApi({
  reducerPath: "nepApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: () => ({}),
});

const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_WATCH_LATER_URL,
  }),
  endpoints: () => ({}),
});

const service = {
  nepApi,
  wishListApi,
};

export default service;
