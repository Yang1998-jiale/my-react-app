/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-24 17:05:05
 * @Description: 描述
 */
import "../style/editor.css";
import ChessEquip from "./modules/left";
import { useDispatch } from "react-redux";
import { initData } from "@/store/battle";
import { useEffect, createContext, useState, useContext } from "react";
import Conter from "./modules/conter";
const BattleContext = createContext<any>(null);

export default function Editor() {
  const [finalHeroList, setFinalHeroList] = useState([]);
  const [stanceKey, setStanceKey] = useState<number | string>(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initData() as any);
  });

  function clickPushHero(heroID) {
    let filterHero = finalHeroList.filter((item) => {});
  }

  return (
    <>
      <div className="w-100% h-100% details-page overflow-y-auto p-y-100px p-x-24px flex items-start">
        <BattleContext.Provider
          value={{ finalHeroList, setFinalHeroList, stanceKey, setStanceKey }}
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
