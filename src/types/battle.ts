/*
 * @Author: yjl
 * @Date: 2024-05-27 15:40:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 11:28:37
 * @Description: 描述
 */

export interface Chess {
  chessType: string;
  heroID: number | string;
  equipID: string[];
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

type HexAnalyse = {
  hexList: any[];
  alternative?: any[];
};
export interface AnalyseInfo {
  robEquip: string[]; //抢装
  hexAnalyse: HexAnalyse; //海克斯列表
  alternativeList: string[]; //备选英雄
}
// let chess = {
//   heroID: "xxx", //英雄ID
//   equipID: "xxx,xxx,xxx", //装备ID
//   position1: "x,y", //站位1
//   position2: "x,y", //站位2
//   isCarry: false, //是否是主C
//   isChosen: false, //是否优先三星
// };
// interface Alternative {
//   orginChess: string;
//   alternativeChess: string;
// }
// interface Simulator {
//   finalList: Chess[]; //最终站位
//   beforeList?: Chess[]; //前期站位
//   centreList?: Chess[]; //中期站位
//   hexList?: string[]; //海克斯列表
//   alternativeList: Alternative[]; //备选
//   robEquipList: string[]; //优先抢装
// }
