/*
 * @Author: yjl
 * @Date: 2024-05-11 09:40:06
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-01 18:01:49
 * @Description: 描述
 */

type GetGroupByKeyParmas = (
  target: any,
  key?: undefined | null | string,
  isSort?: (a: any, b: any) => any | string | undefined
) => any;
export const getGroupByKey: GetGroupByKeyParmas = (
  target,
  key = undefined,
  isSort = undefined
) => {
  if (key === undefined || key === null || target.length === 0) {
    return target;
  }
  const group = {};
  target.forEach((item) => {
    if (group[item[key]]) {
      group[item[key]].value.push(item);
    } else {
      const obj: any = {
        value: [item],
      };
      obj[key] = item[key];
      group[item[key]] = obj;
    }
  });
  let result = Object.values(group);
  if (typeof isSort === "function") {
    result = result.sort(isSort);
  } else if (isSort == "max") {
    result = result.sort((a: any, b: any) => b[key] - a[key]);
  } else if (isSort == "min") {
    result = result.sort((a: any, b: any) => a[key] - b[key]);
  }
  return result;
};

export function createID(tag: any = undefined, suffix: any = undefined) {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    const n = tag + Math.floor(Math.random() * 10.0).toString(16) + suffix;
    guid += n;
  }
  return guid;
}
