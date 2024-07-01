/*
 * @Author: yjl
 * @Date: 2024-04-25 09:40:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-01 13:47:41
 * @Description: 描述
 */
export interface LoginParams {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
