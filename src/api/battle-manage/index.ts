import { defHttp } from "@/utils/axios/index";

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
    { apiUrl: "/api", isTransformResponse: false }
  );
