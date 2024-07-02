/*
 * @Author: yjl
 * @Date: 2024-04-30 10:24:41
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-02 16:46:09
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";

const baseURl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_BASE_URL
    : "/api";

enum Api {
  chess = "/js/chess.js",
  race = "/js/race.js",
  job = "/js/job.js",
  equip = "/js/equip.js",
  hex = "/js/hex.js",
}

export const queryInfo = (data, type = "chess") =>
  defHttp.get(
    { url: Api[type], data },
    { apiUrl: baseURl, isTransformResponse: false }
  );

export const queyrBaidu = (url, data, type) => {
  if (type === "get") {
    return defHttp.get(
      { url: url, data },
      { apiUrl: "/baidu", isTransformResponse: false }
    );
  } else {
    return defHttp.post(
      { url: url, data },
      { apiUrl: "/baidu", isTransformResponse: false }
    );
  }
};
