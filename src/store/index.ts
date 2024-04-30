/*
 * @Author: yjl
 * @Date: 2024-04-30 15:30:01
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-30 15:51:44
 * @Description: 描述
 */

import { configureStore } from "@reduxjs/toolkit";
import battleSlice from "./battle";
const store = configureStore({
  reducer: {
    battle: battleSlice.reducer,
  },
});

export default store;
