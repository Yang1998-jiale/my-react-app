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
const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
const maxUrl = baseURl + "tftstore/s11/624x318/";

function chessFormart(target) {
  const newTarget = new Array(6).fill(undefined);
  if (!target.length) return [];
  target.forEach((item) => {
    const price = Number(item.price);
    if (newTarget[price]) {
      newTarget[price].chessList.push(item);
    } else {
      newTarget[price] = {
        price: price,
        chessList: [item],
      };
    }
  });
  return newTarget;
}
//棋子组件
function Chess() {
  let { chess: chessData } = useSelector(getBattleInfo);
  chessData = chessFormart(chessData);

  return (
    <div className=" w-100% h-100% flex flex-col ">
      {chessData.length
        ? chessData.map((item: any) => {
            return (
              <div className="c-#fff" key={item.price}>
                <h4 className="!m-t-0 m-b-8px">
                  {item.price ? item.price + "费" : "召唤物"}
                </h4>
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
                          className="w-50px h-50px m-r-8px m-b-8px"
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

// 浮窗内容
function Content({ info, type }) {
  console.log(info);

  if (type == "chess") {
    return (
      <div className="flex c-#fff">
        <img
          src={maxUrl + info.TFTID + ".jpg"}
          className="w-624px h-312px"
          alt=""
        />
        <div className="w-624px flex flex-col justify-between">
          <div className="p-24px">
            <div></div>
            {Number(info.price) ? (
              <div className="">{info.price}金币</div>
            ) : null}
          </div>
          <div className="flex items-center flex-1 p-24px b-1px b-solid b-#4e567290 b-x-none">
            <img src={info.skillImage} className="w-40px h-40px" alt="" />
            <div className="flex flex-col items-center m-x-16px flex-shrink-0">
              <span>{info.skillName}</span>
              <span>{info.skillType}</span>
            </div>
            <div className="c-#4e5699">{info.skillDetail}</div>
          </div>
          <div className="flex p-24px">
            <span className="inline-block w-30px">推荐装备</span>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    );
  } else if (type == "equip") {
    return <div>我是装备</div>;
  }
  return undefined;
}

export default function ChessEquip() {
  const [activeKey, setActiveKey] = useState("Chess");
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
          {activeKey === "Chess" ? <Chess /> : <Equip />}
        </div>
      </div>
    </>
  );
}
