/*
 * @Author: yjl
 * @Date: 2024-04-24 13:28:04
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 17:07:54
 * @Description: 描述
 */
import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_util";
const User = [
  {
    userName: "yjl",
    tel: "18639169182",
    password: "molimicha12138",
  },
];
function createToken() {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
  }
  return guid;
}
export default [
  {
    url: "/login",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      const { userName, password } = body;
      const findUser = User.find(
        (item) => item.userName === userName || item.tel === userName
      );
      if (findUser && findUser.password === password) {
        return resultSuccess({ token: createToken() }, { msg: "成功" });
      } else {
        return resultError("用户名或密码错误！");
      }
    },
  },
] as MockMethod[];
