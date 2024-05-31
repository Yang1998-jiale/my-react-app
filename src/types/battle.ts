/*
 * @Author: yjl
 * @Date: 2024-05-27 15:40:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-31 10:51:37
 * @Description: 描述
 */
export interface Chess {
  chessType: string;
  heroID: number | string;
  equipID: string | number[] | string[];
  position: number[] | string[];
  isCarry: boolean;
  isChosen: boolean;
}

export type Tabs = {
  label: string;
  value: number | string;
  key: number | string;
  [x: string]: any;
};
// let chess = {
//   heroID: "xxx", //英雄ID
//   equipID: "xxx,xxx,xxx", //装备ID
//   position1: "x,y", //站位1
//   position2: "x,y", //站位2
//   isCarry: false, //是否是主C
//   isChosen: false, //是否优先三星
// };
