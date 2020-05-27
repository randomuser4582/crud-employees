import { Method, ResponseType } from 'axios';
/**
 * Configuration interface here we setup some properties for Axios.
 */
export interface AxiosConfig<T> {
  method: Method;
  url: string;
  body?: any;
  defaultValue?: T;
  responseType?: ResponseType;
  timeout?: number;
  headers?: {};
  transformer?: (data: any) => any;
  params?: {};
  noBase?: boolean;
}