/*
 * @Author: yjl
 * @Date: 2024-04-24 09:43:59
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-10 17:09:24
 * @Description: 描述
 */
import Axios from "./axios";
import { getItem } from "../cookie";
import { Modal } from "antd";
let errorModal: any = false;
const queue: any = [];
const transform = {
  requestInterceptors(config, options) {
    const token = getItem("Authorization");
    if (token && config?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    if (options.ignoreCancelToken) {
      removeRepeatRequest(config);
    }
    return config;
  },
  responseInterceptors(res) {
    return res;
  },
  responseInterceptorsCatch(error) {
    if (["PROD", "SHOW"].includes(import.meta.env.VITE_APP_IS_PROD)) {
      console.error(error);
    } else {
      if (!errorModal) {
        errorModal = Modal.error({
          content: "服务器异常，请联系系统管理员",
          onOk: () => {
            errorModal = null;
          },
          onCancel: () => {
            errorModal = null;
          },
        });
      }
    }
    return Promise.reject(error);
  },
  transformResponse(res, options) {
    const { isTransformResponse, isReturnNativeResponse } = options;
    console.log(res);

    if (isReturnNativeResponse) {
      return res;
    }

    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error("请求出错,请稍后重试");
    }
    const { data: result, code, message } = data;
    if (data && Reflect.has(data, "code") && (code === 0 || code == 200)) {
      return result;
    } else {
      Modal.error({
        content: message,
        centered: true,
        title: "提示",
      });
    }
  },
  beforeRequestHook(config, options) {
    const { apiUrl, joinPrefix, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl) {
      config.url = `${apiUrl}${config.url}`;
    }
    return config;
  },
};
export function createAxios(config: any = {}) {
  return new Axios({
    authenticationScheme: "",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    transform,
    requestOptions: {
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      ignoreCancelToken: true,
      apiUrl: "",
      urlPrefix: "",
    },
    ...(config || {}),
  });
}

// 取消重复请求
const removeRepeatRequest = (config) => {
  for (const key in queue) {
    const index = +key;
    const item = queue[key];

    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      item.cancel("操作太频繁，请稍后再试");
      queue.splice(index, 1);
    }
  }
};

export const defHttp = createAxios();
