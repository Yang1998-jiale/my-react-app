/*
 * @Author: yjl
 * @Date: 2024-04-30 10:07:43
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-30 16:05:19
 * @Description: 描述
 */

import { useState } from "react";
import "../../style/chess.less";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import Chess from "./chess";
import Equip from "./equip";



export default function ChessEquip() {
  const [activeKey, setActiveKey] = useState("Chess");
  let { chess: chessList } = useSelector(getBattleInfo);

  const tabs = [
    {
      key: "Chess",
      label: "英雄",
    },
    {
      key: "Equip",
      label: "装备",
    },
  ];
  function tabChange(record) {
    setActiveKey(record.key);
  }
  return (
    <>
      <div className="min-w-20% w-20% max-h-100% bg-[rgba(26,31,58,.5)] p-24px b-rd-8px flex flex-col  ">
        <div className="w-100% top-0 left-0 flex-shrink-0">
          <div className="flex">
            {tabs.map((item) => {
              return (
                <div
                  key={item.key}
                  className="c-#4e5672 hover-c-#fff text-18px m-r-32px cursor-pointer"
                  style={{
                    color: activeKey === item.key ? "#fff" : "#4e5672",
                    fontWeight: activeKey === item.key ? 600 : 400,
                  }}
                  onClick={() => tabChange(item)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <i className="block w-100% h-2px bg-#1a1f3a m-y-20px"></i>
        </div>

        <div className="overflow-y-auto left-box w-100% flex-1">
          {activeKey === "Chess" ? <Chess chessList={chessList} /> : <Equip />}
        </div>
      </div>
    </>
  );
}
