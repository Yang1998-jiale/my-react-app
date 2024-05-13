/*
 * @Author: yjl
 * @Date: 2024-05-13 15:47:40
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 17:52:17
 * @Description: 描述
 */
import Empty from "./src/empty-box";
import { getDrapInfo } from "@/utils/drap";
import { update } from "@/store/chess";
import { useDispatch } from "react-redux";
const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";

export default function ChessBox({ info, index }) {
  const dispatch = useDispatch();
  function drop(e: { preventDefault: () => void }) {
    e.preventDefault();
    const obj: any = { value: getDrapInfo(), index };
    dispatch(update(obj));
  }

  return (
    <>
      <div
        className="w-60px h-70px"
        onDrop={drop}
        onDragOver={(e) => e.preventDefault()}
      >
        {info ? (
          <div>
            <img src={minUrl + info.name} className="w-50px h-50px" alt="" />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}
