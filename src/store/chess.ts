/*
 * @Author: yjl
 * @Date: 2024-05-13 16:43:22
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 17:21:26
 * @Description: 描述
 */
import { createSlice } from "@reduxjs/toolkit";
const chessSlice = createSlice({
  name: "chess",
  initialState: {
    list: new Array(28).fill(undefined),
  },
  reducers: {
    // setInfo: (state, value, index) => {
    //   state[index] = value;
    // },
    update(state, action: any) {
        console.log(action.payload);
        
      const { index, value } = action.payload;
      state.list[index] = value;
    },
    add(state, action: any) {
      const findIndex = state.list.findIndex((item) => item === undefined);
      state.list[findIndex] = action.payload;
    },
    resetData(state) {
      state.list = new Array(28).fill(undefined);
    },
  },
});

export function getChessList(state) {
  return state.chess;
}

export const { update, add, resetData } = chessSlice.actions;
export default chessSlice;
