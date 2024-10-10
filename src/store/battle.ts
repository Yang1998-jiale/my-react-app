/*
 * @Author: yjl
 * @Date: 2024-04-30 14:27:46
 * @LastEditors: yjl
 * @LastEditTime: 2024-08-01 08:16:16
 * @Description: 描述
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { queryInfo } from "@/api/battle-manage/index";

const Data_List = [
  {
    key: "chess",
    name: "棋子",
  },
  {
    key: "race",
    name: "种族",
  },
  {
    key: "job",
    name: "职业",
  },
  {
    key: "equip",
    name: "装备",
  },
  {
    key: "hex",
    name: "海克斯",
  },
];

export const initData = createAsyncThunk("", () => {
  const promiseList = Data_List.map((item) => {
    return queryInfo({}, item.key).then((res: any) => ({
      key: item.key,
      value: res.data,
    }));
  });
  return Promise.all(promiseList);
});
const battleSlice = createSlice({
  name: "battle",
  initialState: {
    chess: [], //棋子
    race: [], //种族
    job: [], //职业
    equip: [], //装备
    hex: {}, //海克斯
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initData.fulfilled, (state, action) => {
      const result = action.payload;
      result.forEach((item: any) => {
        if (item.key === "hex" && !Array.isArray(item.value)) {
          state[item.key] = Object.values(item.value);
        } else if (item.key === "equip") {
          state[item.key] = item.value.filter((f) =>
            !f.englishName.includes("11")
          );
        } else {
          state[item.key] = item.value;
        }
      });
    });
  },
});
export function getBattleInfo(state) {
  return state.battle;
}
export default battleSlice;
