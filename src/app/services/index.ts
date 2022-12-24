import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "domain/axiosBaseQuery";

// create api with REACT_APP_BASE_URL environment
const spellApi = createApi({
  reducerPath: "spellApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: () => ({}),
});

// create api with REACT_APP_WATCH_LATER_URL environment
const wishListApi = createApi({
  reducerPath: "wishListApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_WATCH_LATER_URL,
  }),
  endpoints: () => ({}),
});

const service = {
  spellApi,
  wishListApi,
};

export default service;
