/*
 * @Author: yjl
 * @Date: 2024-04-24 13:24:54
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 13:27:56
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";
import { LoginParams } from "./model/types";

enum Api {
  Login = "/login",
}

export const userLogin = (data: LoginParams) =>
  defHttp.post({ url: Api.Login, data }, {});
