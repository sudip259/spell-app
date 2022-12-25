/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { act } from "react-dom/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

it("renders MyComponent", () => {
  expect("Hello world!").toBe("Hello world!");
});

// const REACT_APP_BASE_URL = "https://www.dnd5eapi.co/api";

// const REACT_APP_WATCH_LATER_URL =
//   "https://sudipbhattarai.pythonanywhere.com/api";

// test("POST request test in React with Axios and mocked responses", async () => {
//   // Set up the mock adapter
//   const mock = new MockAdapter(axios);
//   mock.onPost(`${REACT_APP_BASE_URL}/wish_list/`).reply(200, {
//     status: "success",
//   });

//   // Use the act function to wrap the code that makes the POST request
//   let result;
//   await act(async () => {
//     try {
//       const response = await axios.post("/login", {
//         username: "testuser",
//         password: "testpassword",
//       });
//       result = response.data;
//     } catch (error: any) {
//       result = error.response.data;
//     }
//   });

//   // Assert that the response is correct
//   expect(result).toEqual({
//     status: "success",
//   });
// });
