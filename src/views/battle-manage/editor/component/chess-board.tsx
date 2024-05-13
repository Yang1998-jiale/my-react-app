/*
 * @Author: yjl
 * @Date: 2024-05-13 14:48:52
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 17:29:41
 * @Description: 描述
 */
// import { useState } from "react";
import ChessBox from "@/components/ChessBox/index";
import { useSelector } from "react-redux";
import { getChessList } from "@/store/chess";
export default function ChessBoard() {
  const { list: chessList } = useSelector(getChessList);

  return (
    <>
      <div className="w-100% h-100% cursor-pointer flex flex-wrap">
        {chessList.map((item, index) => {
          return (
            <div
              key={index}
              className="c-#fff w-13%  flex-shrink-0 flex justify-center "
              style={
                [7, 21].includes(index)
                  ? { marginLeft: "6.5%" }
                  : [6, 20].includes(index)
                  ? { marginRight: "6.5%" }
                  : {}
              }
            >
              <ChessBox info={item} index={index} />
            </div>
          );
        })}
      </div>
    </>
  );
}
