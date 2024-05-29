/*
 * @Author: yjl
 * @Date: 2024-05-13 15:47:40
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-29 15:51:25
 * @Description: 描述
 */
import Empty from "./src/empty-box";
import Conter from "./src/center-box";
import "./style.less";
import type { Chess } from "@/types/battle";
interface Props {
  info: Chess | null;
  index: number;
  positonKey: number;
}
export default function ChessBox({ info, index, positonKey = 0 }: Props) {
  return (
    <>
      <div className="w-60px h-70px" onDragOver={(e) => e.preventDefault()}>
        {info ? (
          <Conter info={info} index={index} positonKey={positonKey} />
        ) : (
          <Empty index={index} positonKey={positonKey} />
        )}
      </div>
    </>
  );
}
