/*
 * @Author: yjl
 * @Date: 2024-04-30 10:24:41
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-02 17:52:46
 * @Description: 描述
 */
import { defHttp } from "@/utils/axios/index";

const baseURl = "/api";
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
