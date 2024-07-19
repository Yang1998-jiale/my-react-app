/*
 * @Author: yjl
 * @Date: 2024-07-16 13:34:09
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-17 11:16:48
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";

export const queryMars3DData = (url, params = {}) =>
  defHttp.get(
    { url: url, params: params },
    { urlPrefix: "/mars3d", isTransformResponse: false }
  );
