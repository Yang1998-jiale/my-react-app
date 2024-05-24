/*
 * @Author: yjl
 * @Date: 2024-05-13 14:48:52
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-24 17:50:27
 * @Description: 描述
 */
import ChessBox from "../ChessBox/index";
import type { Chess } from "@/types/battle";
interface ChessBoardProps {
  heroList: Chess[];
  positonKey: number;
}
export default function ChessBoard({ heroList, positonKey }: ChessBoardProps) {
  const boardList = new Array(28).fill(null);

  function getChessInfo(x, y) {
    if (getChessInfo.length === 0) {
      return null;
    }
    const chessInfo = heroList.find((item) => {
      const xy = item.position[positonKey] || undefined;
      return xy === `${x},${y}`;
    });
    return chessInfo || null;
  }

  return (
    <>
      <div className="w-100% h-100% cursor-pointer flex flex-wrap">
        {boardList.map((_item, index) => {
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
              <ChessBox
                info={getChessInfo(Math.floor(index / 7), index % 7)}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

/**
 * 站位1
 * 站位2
 * 前期
 * 中期
 */

/**
 * 最终站位
 * 前期
 * 中期
 * 棋盘:棋盘固定28 const 棋盘就可以单独拎出来做组件 只要监听 英雄列表的改变就行
 */
