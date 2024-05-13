/*
 * @Author: yjl
 * @Date: 2024-05-13 14:10:27
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 16:34:34
 * @Description: 描述
 */
import { useState } from "react";
import ChessBoard from "../component/chess-board";
const Stance = [
  {
    key: 1,
    value: "最终站位",
  },
  {
    key: 2,
    value: "前中期",
  },
];
export default function Conter() {
  const list = [];
  const [stanceKey, setStanceKey] = useState<number | string>(1);
  return (
    <>
      <div className="flex-1  bg-[rgba(26,31,58,.5)] min-h-40% flex flex-col m-x-16px p-24px b-rd-8px">
        <div className="c-#fff flex items-center">
          <div className="flex items-center flex-1">
            <span className="text-18px m-r-16px">阵容占位</span>
            <span>人口数: {list.length}/10</span>
          </div>
          <div className="flex items-center m-r-16px">
            {Stance.map((item) => (
              <div
                style={
                  stanceKey == item.key
                    ? {
                        background: "#c174e8",
                        color: "#fff",
                      }
                    : {}
                }
                onClick={() => setStanceKey(item.key)}
                key={item.key}
                className="text-center w-80px p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#c174e8 cursor-pointer hover-b-[#c174e8]"
              >
                {item.value}
              </div>
            ))}
          </div>
          <div className="p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#c174e8 cursor-pointer hover-b-[#c174e8] ">
            重置棋盘
          </div>
        </div>
        <div className="flex-1 m-y-24px">
          {stanceKey == 1 ? <ChessBoard /> : <div></div>}
        </div>
      </div>
    </>
  );
}
