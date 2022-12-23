import axios from "axios";
import type { AxiosError } from "axios";

// Set default header. e.g, X-API-KEY
// axios.defaults.headers["x-functions-key"] =
//   "trsmthTaK7p/CS6CSQamg0zB9xxmd9w5COrtM9vS1azadc4sksMYPA==";

const axiosBaseQuery = ({ baseUrl }: any) => {
  return async (conf: any) => {
    let { url, method, body, params } = conf;
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};
// (
//   { baseUrl }: { baseUrl: string | undefined } = { baseUrl: "" }
// ): BaseQueryFn<
//   {
//     url: string;
//     method: AxiosRequestConfig["method"];
//     data?: AxiosRequestConfig["data"];
//     params?: AxiosRequestConfig["params"];
//   },
//   unknown,
//   unknown
// > =>
// async ({ url, method, data, params }) => {
//   try {
//     const result = await axios({ url: baseUrl + url, method, data, params });
//     return { data: result.data };
//   } catch (axiosError) {
//     let err = axiosError as AxiosError;
//     return {
//       error: {
//         status: err.response?.status,
//         data: err.response?.data || err.message,
//       },
//     };
//   }
// };

export default axiosBaseQuery;
