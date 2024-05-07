import { AxiosError } from 'axios';

export type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  RawAxiosResponseHeaders
} from 'axios';

export interface DataResponseType<T> {
  redirect?: string;
  success: boolean;
  data: T;
  error?: AxiosError;
}
