import { AxiosResponse } from "axios";

export type NewDataType = {
  title: string;
};

export type ApiRequestType = {
  get: (url: string, request?: object) => Promise<AxiosResponse<any>>;
  delete: (url: string, request?: object) => Promise<AxiosResponse<any>>;
  post: (
    url: string,
    data: NewDataType,
    request?: object
  ) => Promise<AxiosResponse<any>>;
};
