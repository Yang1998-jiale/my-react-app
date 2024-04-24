/*
 * @Author: yjl
 * @Date: 2024-04-24 10:08:00
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 14:42:21
 * @Description: 描述
 */

/**
 * setItem("键","值",未来到期的毫秒值);
 * removeItem("键");
 * getItem("键")
 * clear() 清除所有cookie
 * getAllCookies() 返回所有cookie的键值对  组成一个对象
 */

/** 根据键值设置cookie值,  [millisecond为过期的毫秒值] */
export function setItem(key, value, millisecond = 24 * 60 * 60 * 1000) {
  let str = "";
  str = str + key + "=" + value;
  if (millisecond != undefined) {
    const dateGmt = new Date(new Date().getTime() + millisecond)?.toString();
    str += ";expires=" + dateGmt;
  }
  document.cookie = str;
}

/*
    根据键删除cookie
*/
export function removeItem(key) {
  document.cookie =
    "" +
    key +
    "=" +
    "*;expires=" +
    new Date(new Date().getTime() - 1000).toString();
}

/*
    根据键获取cookie值, 若未获取到返回 null
*/
export function getItem(key) {
  const cookiesStr = document.cookie;
  if (cookiesStr == "") {
    return null;
  }

  let index = cookiesStr.indexOf(key + "=");
  if (index == -1) {
    return null;
  }
  index = index + key.length + 1;

  let cookieStr = cookiesStr.substring(index);

  const subIndex = cookieStr.indexOf(";");

  if (subIndex != -1) {
    cookieStr = cookieStr.substring(0, subIndex);
  }

  return cookieStr;
}

/** 清除所有cookie */
export function clear() {
  const cookieObj = getAllCookies();
  for (const key in cookieObj) {
    removeItem(key);
  }
}

/** 获取所有cookie, 返回一个cookie对象 */
export function getAllCookies() {
  const cookiesStr = document.cookie;
  const cookieObj = new Object();

  // 当前cookie为空时,返回空对象
  if (cookiesStr == "") {
    return cookieObj;
  }

  const cookieArr = cookiesStr.split(";");

  for (let index = 0; index < cookieArr.length; index++) {
    const cookieKey = cookieArr[index]
      .substring(0, cookieArr[index].indexOf("="))
      .trim();

    const cookieVal = cookieArr[index]
      .substring(cookieArr[index].indexOf("=") + 1)
      .trim();

    cookieObj[cookieKey] = cookieVal;
  }

  return cookieObj;
}
