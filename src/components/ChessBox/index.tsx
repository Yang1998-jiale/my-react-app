/*
 * @Author: yjl
 * @Date: 2024-05-13 15:47:40
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-22 18:03:08
 * @Description: 描述
 */
import Empty from "./src/empty-box";
import Conter from "./src/center-box";
import { useDispatch } from "react-redux";
import { update, resetActiveChess, resetActiveChessIndex } from "@/store/chess";
import { useSelector } from "react-redux";
import { getChessList } from "@/store/chess";

export default function ChessBox({ info, index }) {
  const dispatch = useDispatch();
  const { activeChessInfo, activeChessIndex } = useSelector(getChessList);
  function drop(e: { preventDefault: () => void }) {
    if (!activeChessInfo) return;
    e.preventDefault();
    const obj: any = {
      value: activeChessIndex === null ? activeChessInfo : info,
      index,
    };
    dispatch(update(obj));
    dispatch(resetActiveChess());
    dispatch(resetActiveChessIndex());
  }
  return (
    <>
      <div className="w-60px h-70px" onDragOver={(e) => e.preventDefault()}>
        {info ? (
          <Conter info={info} index={index} onDropFn={drop} />
        ) : (
          <Empty onDropFn={drop} />
        )}
      </div>
    </>
  );
}
