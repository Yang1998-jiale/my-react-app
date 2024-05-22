/*
 * @Author: yjl
 * @Date: 2024-05-13 16:43:22
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-22 18:00:37
 * @Description: 描述
 */
import { createSlice } from "@reduxjs/toolkit";
const chessSlice = createSlice({
  name: "chess",
  initialState: {
    list: new Array(28).fill(undefined),
    activeChessInfo: null,
    activeChessIndex: null,
  },
  reducers: {
    // setInfo: (state, value, index) => {
    //   state[index] = value;
    // },
    update(state, action: any) {
      const { index, value } = action.payload;
      console.log("index", value);

      if (state.activeChessIndex !== null) {
        state.list[state.activeChessIndex] = value;
        state.list[index] = state.activeChessInfo;
      } else {
        state.list[index] = value;
      }
    },
    add(state, action: any) {
      const findIndex = state.list.findIndex((item) => item === undefined);
      state.list[findIndex] = action.payload;
    },
    resetData(state) {
      state.list = new Array(28).fill(undefined);
    },

    setActiveChess(state, action) {
      state.activeChessInfo = action.payload;
    },
    setActiveChessIndex(state, action) {
      state.activeChessIndex = action.payload;
    },
    resetActiveChess(state) {
      state.activeChessInfo = null;
    },
    resetActiveChessIndex(state) {
      state.activeChessIndex = null;
    },
  },
});

export function getChessList(state) {
  return state.chess;
}

export const {
  update,
  add,
  resetData,
  setActiveChess,
  resetActiveChess,
  setActiveChessIndex,
  resetActiveChessIndex,
} = chessSlice.actions;
export default chessSlice;
