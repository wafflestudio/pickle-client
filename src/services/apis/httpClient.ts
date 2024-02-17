/**
 * @fileoverview Axios 클라이언트 모듈
 *
 * Axios를 사용하여 HTTP 요청을 처리하는 클라이언트 모듈입니다.
 * withCredentials 옵션을 사용하여 인증된 요청을 가능하게 합니다.
 *
 */

import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";

interface RequestOptions {
  path: string;
  body?: { [key: string]: unknown };
  headers?: AxiosRequestHeaders;
}

export class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "",
      withCredentials: true,
    });
  }

  private request(
    method: string,
    options: RequestOptions,
  ): Promise<AxiosResponse> {
    const { path, body, headers } = options;
    return this.instance.request({
      method,
      headers,
      url: path,
      data: body,
      withCredentials: true,
    });
  }

  public get(
    path: string,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return this.request("GET", { path, headers });
  }

  public post(
    path: string,
    body: { [key: string]: unknown },
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return this.request("POST", { path, body, headers });
  }

  public put(
    path: string,
    body: { [key: string]: unknown },
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return this.request("PUT", { path, body, headers });
  }

  public patch(
    path: string,
    body: { [key: string]: unknown },
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return this.request("PATCH", { path, body, headers });
  }

  public delete(
    path: string,
    body?: { [key: string]: unknown },
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return this.request("DELETE", { path, body, headers });
  }
}

export default function createHttpClient(): HttpClient {
  return new HttpClient();
}
