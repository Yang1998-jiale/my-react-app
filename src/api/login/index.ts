/*
 * @Author: yjl
 * @Date: 2024-04-24 13:24:54
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-10 17:11:05
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";
import { LoginParams, LoginResponse } from "./model/types";

enum Api {
  Login = "/user/login",
  User = "/user/getUserInfo",
}

export const userLogin = (data: LoginParams) =>
  defHttp.post<LoginResponse>(
    { url: Api.Login, data },
    {
      urlPrefix: "/base",
    }
  );

export const getUserInfo = (data) =>
  defHttp.get(
    { url: Api.User, params: data },
    {
      urlPrefix: "/base",
    }
  );
