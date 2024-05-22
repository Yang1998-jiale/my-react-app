/*
 * @Author: yjl
 * @Date: 2024-05-13 15:25:28
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-22 17:37:13
 * @Description: 描述
 */
// import { useState } from "react";
import bg from "@/assets/images/slot-bg.png";

export default function ChessBox({ onDropFn }) {
  return (
    <>
      <img
        onDrop={(e) => onDropFn(e)}
        src={bg}
        className="w-100% h-100%"
        alt=""
      />
    </>
  );
}
