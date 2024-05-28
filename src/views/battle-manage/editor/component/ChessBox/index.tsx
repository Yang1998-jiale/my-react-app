/*
 * @Author: yjl
 * @Date: 2024-05-13 15:47:40
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-28 14:05:56
 * @Description: 描述
 */
import Empty from "./src/empty-box";
import Conter from "./src/center-box";
import "./style.less";

export default function ChessBox({ info, index, positonKey = 0 }) {
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
