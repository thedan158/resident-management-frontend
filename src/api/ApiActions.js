import { getAPIs } from "./APILinks";
import customAxios from "./AxiosInterceptors";

export function getAPIActionJSON(
  type,
  data,
  onError = () => { },
  params = "",
  onSuccess = () => { },
  addparams = ''
) {
  const api = getAPIs[type];

  return (dispatch, getState) => {
    dispatch({ type: "api.loading" });
    customAxios({
      method: api.method,
      url: api.path + addparams,
      params: params,
      data: data,
    })
      .then(function (response) {
        dispatch({ type: "api.success" });
        if (response.status === 200 || response.status === 202) {
          dispatch({
            type: `${type}.reply`,
            data: response.data,
            headers: response.headers,
          });
        }
        if (response.status === 200 || response.status === 202 || response.status === 201) {
          onSuccess(response.data)
        }
      })
      .catch((e) => {
        console.log(e)
        dispatch({ type: "api.success" });
      });
  };
}

export async function getStatelessAPI(
  type,
  data,
  headers,
  params = {},
  addparams = ''
) {
  const api = getAPIs[type];
  try {
    const res = await customAxios({
      method: api.method,
      url: api.path + addparams,
      params: params,
      data: data,
      headers: headers
    });
    const responseData = res.data;
    return responseData;
  } catch (error) {
    if (error) {
      // Error Handler
      console.log(error);
    }
  }
}