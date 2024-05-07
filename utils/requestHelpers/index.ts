import getAuthAxiosAsync from './getAuthAxiosAsync';
import { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from './request.types';

export type ResponseError = {
  message: string;
};

export const fetcher = async (url: string) => {
  const data = await singleGetRequest(url);

  return data;
};

export const singleGetRequest = async <Resp>(
  apiUrl: string,
  config?: AxiosRequestConfig
): Promise<Resp> => {
  const request = await getAuthAxiosAsync();

  return request
    .get(apiUrl, {
      params: config?.params,
      ...config
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const singlePostRequest = async <Req, Resp>(
  apiUrl: string,
  data: Req,
  config?: AxiosRequestConfig
): Promise<Resp> => {
  const request = await getAuthAxiosAsync();

  const test = request
    .post<Resp>(apiUrl, data, {
      params: { ...config?.params },
      ...config
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });

  return test;
};

export const singlePutRequest = async <Req, Resp>(
  apiUrl: string,
  data: Req,
  config?: AxiosRequestConfig
): Promise<Resp> => {
  const request = await getAuthAxiosAsync();

  return request
    .put<Resp>(apiUrl, data, {
      params: config?.params,
      ...config
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
};

export const deleteRequest = async <Resp>(
  apiUrl: string,
  config?: AxiosRequestConfig
): Promise<Resp> => {
  const request = await getAuthAxiosAsync();

  return request
    .delete(apiUrl, {
      params: config?.params,
      ...config
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
};
