import axios, { AxiosPromise } from "axios";
import Qs from "qs";
import { cookies, destroySession } from "./cookies";
// import {
//   errorHandlerSetErrors,
//   errorHandlerReset,
// } from "@tours-2/src/store/errorHandler/actions"; TODO
// import store from "@tours-2/src/store"; TODO
// import { navigate } from "@reach/router"; TODO

// Stringify the params
axios.interceptors.request.use((config) => {
  return {
    paramsSerializer: (params: any) => {
      return Qs.stringify(params, {
        arrayFormat: "brackets",
      });
    },
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    crossDomain: true,
    ...config,
  };
});

// Fetch data from given url
// - Pass request type in options["method"]
// - Pass params in options["params"]
const fetchJSON = (
  url: string,
  options = {},
  redirectForError = true,
  show401 = false,
  errorHandlerCode = "",
  overriddenToken = ""
): AxiosPromise<any> => {
  let accessToken;
  const cookieToken = cookies.get("th_token");
  if (overriddenToken) {
    accessToken = overriddenToken;
  } else if (cookieToken) {
    accessToken = cookieToken;
  }

  options = {
    ...options,
    headers: {
      "Access-token": accessToken,
    },
  };

  const res = axios(url, options);
  // store.dispatch(errorHandlerReset()); TODO
  res
    .then((response) => {
      console.log("data => ", response.data);
    })
    .catch(
      ({
        response: {
          status,
          data: { messages },
        },
      }) => {
        if ([404].includes(status) && redirectForError) {
          // navigate("/not-found"); TODO
        }
        console.log("error => ", messages);
        if (messages?.errors) {
          // store.dispatch(
          //   errorHandlerSetErrors(messages.errors, errorHandlerCode)
          // ); TODO
        }
        if ([401].includes(status)) {
          destroySession();
          if (!show401) {
            // store.dispatch(errorHandlerReset()); TODO
          }
        }
      }
    );
  return res;
};

export default fetchJSON;
