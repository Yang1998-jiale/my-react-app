import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../_util";

const studyList = (() => {
  const result: any = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: "@id()",
      name: "@cname()",
      "age|18-60": 1,
      "sex|1": [1, 2],
      birthday: "@datetime()",
      description: "@ctitle()",
    });
  }
  return result;
})();

export default [
  {
    url: "/QueryStudyList",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(studyList, { msg: "成功" });
    },
  },
] as MockMethod[];
