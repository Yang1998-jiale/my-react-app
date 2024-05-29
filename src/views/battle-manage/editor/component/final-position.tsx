/*
 * @Author: yjl
 * @Date: 2024-05-27 15:40:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-29 15:09:23
 * @Description: 描述
 */
import { useState } from "react";
import CbessBoard from "./ChessBoard/index";
import { PositionList } from "../util";

export default function Final({ heroList }) {
  //   const [heroList, setHeroList] = useState([]);
  const [positonKey, setPositionKey] = useState<number | string>(0);

  return (
    <>
      <div className="w-100% h-100% cursor-pointer">
        <div className="flex items-center m-r-16px justify-end">
          {PositionList.map((item) => (
            <div
              style={
                positonKey == item.value
                  ? {
                      color: "#fff",
                      borderColor: "#fff",
                    }
                  : {}
              }
              onClick={() => setPositionKey(item.value)}
              key={item.value}
              className="text-center w-80px p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#fff cursor-pointer hover-b-#fff"
            >
              {item.label}
            </div>
          ))}
        </div>
        <CbessBoard heroList={heroList} positonKey={positonKey as number} />
      </div>
    </>
  );
}
