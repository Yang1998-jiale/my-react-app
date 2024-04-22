/*
 * @Author: yjl
 * @Date: 2024-04-22 13:41:34
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 17:15:57
 * @Description: 描述
 */
import React from "react";
import axios from "axios";
import { Modal } from "antd";
import { redirect } from "react-router-dom";
const instance = axios.create({});
// const navigate = useNavigate();
let errorModal: any = false;

instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("Authorization");
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.timeout = 0;

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response): any => {
    const { data } = response;
    const isLogin =
      !!window.location.hash &&
      (window.location.hash === "#/" || window.location.hash.startsWith("#/?"));

    let result: any = null;
    if (data.sessionExpired) {
      if (!errorModal && !isLogin) {
        errorModal = Modal.warning({
          content: data.errors[0],
          okText: "确定",
          onOk: () => {
            errorModal = null;
            redirect("/");
          },
          onCancel: () => {
            errorModal = null;
            redirect("/");
          },
        });
      }
      result = Promise.reject(data);
    } else if (data.status === "ERROR") {
      if (!errorModal) {
        errorModal = Modal.error({
          content: (
            <span>
              {data.errors.map((err) => (
                <div key={Math.random()}>{err}</div>
              ))}
            </span>
          ),
          onOk: () => {
            errorModal = null;
          },
          onCancel: () => {
            errorModal = null;
          },
        });
      }
      result = Promise.reject(data);
    } else {
      result = Promise.resolve(data);
    }
    return result;
  },
  (error) => {
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
  }
);

export default instance;
