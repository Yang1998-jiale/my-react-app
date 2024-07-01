/*
 * @Author: yjl
 * @Date: 2024-04-24 13:24:54
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-01 13:47:51
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";
import { LoginParams, LoginResponse } from "./model/types";

enum Api {
  Login = "/login",
}

export const userLogin = (data: LoginParams) =>
  defHttp.post<LoginResponse>({ url: Api.Login, data }, {});
