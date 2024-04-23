/*
 * @Author: yjl
 * @Date: 2024-04-23 09:53:26
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 10:29:36
 * @Description: 描述
 */
import axios from "@/utils/axios/axios";

enum Api {
  Query_Study_List = "/QueryStudyList",
}

export const queryStudyList = (data) => axios.post(Api.Query_Study_List, data);
