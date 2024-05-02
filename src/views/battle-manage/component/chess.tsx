/*
 * @Author: yjl
 * @Date: 2024-04-30 10:07:43
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-30 16:05:19
 * @Description: 描述
 */

import { useState } from "react";
import { Popover } from "antd";
import "../style/chess.less";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import Content from "./content";
const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";

function chessFormart(target) {
  const newTarget = new Array(6).fill(undefined);
  if (!target.length) return [];
  target.forEach((item) => {
    const price = Number(item.price);
    if (item.id == "7593") {
      return;
    }
    if (newTarget[price]) {
      newTarget[price].chessList.push(item);
    } else {
      newTarget[price] = {
        price: price,
        chessList: [item],
      };
    }
  });
  return newTarget.filter((item) => item.price);
}
//棋子组件
function Chess({ chessList }) {
  const chessData = chessFormart(chessList);

  return (
    <div className=" w-100% h-100% flex flex-col ">
      {chessData.length
        ? chessData.map((item: any) => {
            return (
              <div className="c-#fff" key={item.price}>
                <h4 className="!m-t-0 m-b-8px">{item.price + "费"}</h4>
                <div className="flex flex w-100% flex-wrap">
                  {item.chessList.map((item) => {
                    return (
                      <Popover
                        content={<Content info={item} type={"chess"} />}
                        rootClassName={"chess-popover"}
                        key={item.id}
                      >
                        <img
                          src={minUrl + item.name}
                          className="w-50px h-50px m-r-8px m-b-8px cursor-pointer"
                          alt=""
                        />
                      </Popover>
                    );
                  })}
                </div>
              </div>
            );
          })
        : "暂无数据"}
    </div>
  );
}
//装备组件
function Equip() {
  return <div>装备</div>;
}

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
