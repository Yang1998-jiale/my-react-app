/*
 * @Author: yjl
 * @Date: 2024-04-30 15:30:01
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-24 14:43:17
 * @Description: 描述
 */

import { configureStore } from "@reduxjs/toolkit";
import battleSlice from "./battle";
import chessSlice from "./chess";
const store = configureStore({
  reducer: {
    battle: battleSlice.reducer,
    chess: chessSlice.reducer,
  },
});

export default store;

// let chess = {
//   heroID: "xxx", //英雄ID
//   equipID: "xxx,xxx,xxx", //装备ID
//   position1: "x,y", //站位1
//   position2: "x,y", //站位2
//   isCarry: false, //是否是主C
//   isChosen: false, //是否优先三星
// };
