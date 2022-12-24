/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosError } from "axios";

// custom axios base query (api call for respective method and return response)
const axiosBaseQuery = ({ baseUrl }: any) => {
  return async (conf: any) => {
    const { url, method, body, params } = conf;
    try {
      // api call
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
      });
      // return success response
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      // return error response
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
