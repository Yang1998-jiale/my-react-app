/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 16:33:49
 * @Description: 描述
 */
import "../style/editor.css";
import ChessEquip from "./modules/left";
import { useDispatch } from "react-redux";
import { initData } from "@/store/battle";
import { useEffect } from "react";
import Conter from "./modules/conter";

export default function Editor() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData() as any);
  });

  return (
    <>
      <div className="w-100% h-100% details-page overflow-y-auto p-y-100px p-x-24px flex items-start">
        <ChessEquip />
        <Conter />
        <div className="w-35% flex-shrink-0"></div>
      </div>
    </>
  );
}
