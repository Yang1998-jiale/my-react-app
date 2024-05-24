export interface Chess {
  chessType: string;
  heroID: number | string;
  equipID: string | number[] | string[];
  position: number[] | string[];
  isCarry: boolean;
  isChosen: boolean;
}
// let chess = {
//   heroID: "xxx", //英雄ID
//   equipID: "xxx,xxx,xxx", //装备ID
//   position1: "x,y", //站位1
//   position2: "x,y", //站位2
//   isCarry: false, //是否是主C
//   isChosen: false, //是否优先三星
// };
