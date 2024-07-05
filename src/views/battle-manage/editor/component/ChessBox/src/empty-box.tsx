/*
 * @Author: yjl
 * @Date: 2024-05-13 15:25:28
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-05 17:51:32
 * @Description: 描述
 */
// import { useState } from "react";
import bg from "@/assets/images/slot-bg.png";
import { createHero, useBattle } from "@/views/battle-manage/editor/util";
interface Props {
  index: number;
  positonKey: number;
}
export default function ChessBox({ index, positonKey = 0 }: Props) {
  const { dropChessAdd, dropChessUpdate } = useBattle();
  function dropFn(e: React.DragEvent) {
    const xy = `${Math.floor(index / 7)},${index % 7}`;

    e.preventDefault();
    const action = e.dataTransfer.getData("action");
    if (action === "add") {
      const chessID = e.dataTransfer.getData("chessID");
      const chessObj = createHero(chessID);
      dropChessAdd(chessObj, xy, positonKey);
    } else if (action === "update") {
      const targetXY = e.dataTransfer.getData("chessXY");
      dropChessUpdate(targetXY, xy, positonKey);
    }
  }
  return (
    <>
      <img
        onDrop={(e) => {
          dropFn(e);
        }}
        src={bg}
        data-index={index}
        className="w-100% h-100%"
        alt=""
      />
    </>
  );
}
