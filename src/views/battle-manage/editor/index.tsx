/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-24 18:05:45
 * @Description: 描述
 */
import "../style/editor.css";
import ChessEquip from "./modules/left";
import { useDispatch } from "react-redux";
import { initData } from "@/store/battle";
import { useEffect, createContext, useState, useContext } from "react";
import Conter from "./modules/conter";
import { message } from "antd";
import type { Chess } from "@/types/battle";
const BattleContext = createContext<any>(null);

function createHero(heroID, chessType = "hero"): Chess {
  return {
    chessType,
    heroID,
    equipID: [],
    position: [],
    isCarry: false,
    isChosen: false,
  };
}

export default function Editor() {
  const [finalHeroList, setFinalHeroList] = useState<Chess[]>([]);
  const [stanceKey, setStanceKey] = useState<number | string>(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData() as any);
  });

  function clickPushHero(heroID) {
    const chessObj = createHero(heroID);
    if (stanceKey == 1) {
      finalPush(chessObj);
    }
  }

  function finalPush(target) {
    const filterHero = finalHeroList.filter((item) => item.chessType == "hero");
    if (filterHero?.length >= 10) {
      message.error("阵容中英雄数量超过10个");
      return;
    }
    const xy =
      Math.floor(finalHeroList.length / 7) + "," + (finalHeroList.length % 7);
    target.position = [xy, xy];
    finalHeroList.push(target);
    setFinalHeroList([...finalHeroList]);
  }

  // function drapFn(hero) {
  //   if (typeof hero !== "object") {
  //     hero = createHero(hero);
  //   }
  // }

  return (
    <>
      <div className="w-100% h-100% details-page overflow-y-auto p-y-100px p-x-24px flex items-start">
        <BattleContext.Provider
          value={{
            finalHeroList,
            setFinalHeroList,
            stanceKey,
            setStanceKey,
            clickPushHero,
          }}
        >
          <ChessEquip />
          <Conter />
          <div className="w-35% flex-shrink-0"></div>
        </BattleContext.Provider>
      </div>
    </>
  );
}

export const useBattle = () => {
  return useContext(BattleContext);
};
