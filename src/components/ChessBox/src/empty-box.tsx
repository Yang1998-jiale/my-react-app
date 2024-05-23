/*
 * @Author: yjl
 * @Date: 2024-05-13 15:25:28
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-23 16:13:39
 * @Description: 描述
 */
// import { useState } from "react";
import bg from "@/assets/images/slot-bg.png";

export default function ChessBox({ onDropFn, index }) {
  return (
    <>
      <img
        onDrop={(e) => onDropFn(e)}
        src={bg}
        data-index={index}
        className="w-100% h-100%"
        alt=""
      />
    </>
  );
}
