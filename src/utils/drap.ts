/*
 * @Author: yjl
 * @Date: 2024-05-13 15:53:03
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 16:23:52
 * @Description: 描述
 */
let drapInfo: any = null;
export function drap(info) {
  drapInfo = info;
}

export function getDrapInfo() {
  return drapInfo;
}
