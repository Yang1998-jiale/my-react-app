/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-30 16:11:15
 * @Description: 描述
 */
import "../style/editor.css";
import ChessEquip from "./component/left";
import { useDispatch } from "react-redux";
import { initData } from "@/store/battle";
import { useEffect } from "react";

export default function Editor() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData() as any);
  });

  return (
    <>
      <div className="w-100% h-100% details-page overflow-y-auto p-y-100px p-x-24px">
        <ChessEquip />
      </div>
    </>
  );
}
