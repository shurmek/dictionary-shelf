import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/** Query params to request type */
type RequestParam = string | string[] | Record<string, string>

/** Requset config */
interface RequestConfig<T> extends Pick<AxiosRequestConfig<T>, "url" | "method" | "data" | "headers"> {
  url: string;
  params?: Record<string, RequestParam>
}

/** It's default response interface from server rejected request*/
interface FailureResponse {
  status: number,
  message: string,
}

/** Response handlers function type*/
type responseHandlers = <T, F extends FailureResponse = FailureResponse>(
  onSuccess: (res: AxiosResponse<T>) => any,
  onFailure: (res: AxiosResponse<F>) => any
) => Promise<any>;

/** 
 * Request util takes axios config and returns the function provided
 * the onSuccess callback when a request has been successful
 * and onFailure when the request has been failed or
 * the server responced with status lower 200 or more 300
 */
export default function requestUtil<S>({
  url,
  method = "GET",
  data,
  headers,
  params
}: RequestConfig<S>): responseHandlers {

  return async (
    onSuccess,
    onFailure
  ) => axios({
    url,
    method,
    data,
    headers: { 'Content-Type': 'application/json', ...headers },
    params,
    validateStatus: (status) => status >= 200 && status < 400
  }).then(onSuccess, onFailure);
}