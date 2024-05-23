/*
 * @Author: yjl
 * @Date: 2024-05-22 16:44:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-23 16:59:13
 * @Description: 描述
 */

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
import { useDispatch } from "react-redux";
import { update, setActiveChess, setActiveChessIndex } from "@/store/chess";

export default function CenterBox({ info, index, onDropFn }) {
  const dispatch = useDispatch();

  function dragStart() {
    dispatch(setActiveChess(info));
    dispatch(setActiveChessIndex(index));
  }
  return (
    <>
      <div
        onDrop={(e) => onDropFn(e)}
        className={`chess-box ${info?.price ? "price-" + info.price : ""}`}
        onClick={() => {
          dispatch(update({ value: null, index } as any));
        }}
        onDrag={dragStart}
      >
        <i
          data-index={index}
          className="w-100% h-100% bg-img "
          style={{ background: `url(${minUrl + info.name})` }}
        ></i>
      </div>
    </>
  );
}
