/*
 * @Author: yjl
 * @Date: 2024-05-22 16:44:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-22 17:52:57
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
        onClick={() => {
          dispatch(update({ value: null, index } as any));
        }}
        onDrag={dragStart}
      >
        <img src={minUrl + info.name} className="w-50px h-50px" alt="" />
      </div>
    </>
  );
}
