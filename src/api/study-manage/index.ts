/*
 * @Author: yjl
 * @Date: 2024-04-23 09:53:26
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 12:10:45
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";

enum Api {
  Query_Study_List = "/QueryStudyList",
}

export const queryStudyList = (data) =>
  defHttp.post({ url: Api.Query_Study_List, data }, {});
