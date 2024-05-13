/*
 * @Author: yjl
 * @Date: 2024-04-30 15:30:01
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 17:09:01
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
