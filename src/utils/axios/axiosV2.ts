/*
 * @Author: yjl
 * @Date: 2024-04-23 13:21:31
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 16:05:28
 * @Description: 描述
 */
import axios, { AxiosInstance, AxiosResponse } from "axios";

function isFunction(target) {
  return typeof target === "function";
}

export class Axios {
  private axiosInstance: AxiosInstance;
  private readonly options: any;

  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.axiosInterceptor();
  }

  getAxios() {
    return this.axiosInstance;
  }

  private createAxios(options) {
    this.axiosInstance = axios.create(options);
  }

  //设置拦截器
  private axiosInterceptor() {
    const {
      axiosInstance,
      options: { transform },
    } = this;
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform as any;

    //设置请求拦截
    this.axiosInstance.interceptors.request.use((config: any) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);
    //设置请求拦截错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(requestInterceptorsCatch);
    }

    //
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res, this.options);
      }
      return res;
    }, undefined);
    //设置响应拦截处理
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(axiosInstance, error);
      });
    }
  }

  
}
