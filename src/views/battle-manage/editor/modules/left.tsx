/*
 * @Author: yjl
 * @Date: 2024-04-30 10:07:43
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-14 16:38:21
 * @Description: 描述
 */

import { useState, memo } from "react";
import "../../style/chess.less";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import Chess from "../component/chess";
import Equip from "../component/equip";
import type { Tabs } from "@/types/battle";

function Left() {
  const [activeKey, setActiveKey] = useState<string | number>("Chess");
  const {
    chess: chessList,
    job: jobList,
    race: raceList,
    equip: equipList,
  } = useSelector(getBattleInfo);

  const tabs: Tabs[] = [
    {
      key: "Chess",
      value: "Chess",
      label: "英雄",
    },
    {
      key: "Equip",
      value: "Equip",
      label: "装备",
    },
  ];
  function tabChange(record: Tabs) {
    setActiveKey(record.key);
  }
  return (
    <>
      <div className="min-w-22.5% max-w-22.5% bg-[rgba(26,31,58,.5)] h-100% p-24px b-rd-8px flex flex-col flex-shrink-0">
        <div className="w-100% top-0 left-0 flex-shrink-0">
          <div className="flex">
            {tabs.map((item) => {
              return (
                <div
                  key={item.key}
                  className=" hover-c-#fff text-18px m-r-32px cursor-pointer"
                  style={
                    activeKey === item.key
                      ? {
                          color: "#fff",
                          fontWeight: 600,
                        }
                      : {
                          color: "#999",
                        }
                  }
                  onClick={() => tabChange(item)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          <i className="block w-100% h-2px bg-#1a1f3a m-y-20px"></i>
        </div>

        <div className="left-box w-100% h-[calc(100%-70px)]">
          {activeKey === "Chess" ? (
            <Chess
              chessList={chessList}
              jobList={jobList}
              raceList={raceList}
            />
          ) : (
            <Equip equipList={equipList} />
          )}
        </div>
      </div>
    </>
  );
}
const ChessEquip = memo(Left);
export default ChessEquip;
