/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-31 11:30:03
 * @Description: 描述
 */
import "../style/editor.css";
import ChessEquip from "./modules/left";
import { useDispatch } from "react-redux";
import { initData } from "@/store/battle";
import { useEffect, useState, useMemo } from "react";
import Conter from "./modules/conter";
import { message } from "antd";
import type { Chess } from "@/types/battle";
import { BattleContext, createHero } from "./util";

type SetFn = (state: Chess[]) => Chess[] | any[];

export default function Editor() {
  const [finalHeroList, setFinalHeroList] = useState<Chess[]>([]);
  const [stanceKey, setStanceKey] = useState<number | string>(1);
  const dispatch = useDispatch();
  const targetList = useMemo(() => {
    if (stanceKey === 1) {
      return finalHeroList;
    } else {
      return [];
    }
  }, [stanceKey, finalHeroList]);

  function setTarget(setFn: SetFn) {
    if (typeof setFn !== "function") {
      return TypeError("参数为函数");
    }
    if (stanceKey == 1) {
      setFinalHeroList((state) => setFn(state));
    }
  }

  // function setTargetValue() {}

  useEffect(() => {
    dispatch(initData() as any);
  });

  function clickPushHero(heroID: string) {
    const chessObj = createHero(heroID);
    chsssListPush(chessObj);
  }

  function chsssListPush(target: Chess, xy: string = "") {
    const filterHero = finalHeroList.filter((item) => item.chessType == "hero");
    if (filterHero?.length >= 10) {
      message.error("阵容中英雄数量超过10个");
      return;
    }
    if (!xy) {
      xy =
        Math.floor(finalHeroList.length / 7) + "," + (finalHeroList.length % 7);
    }
    target.position = [xy, xy];
    setTarget((state) => {
      return [...state, target];
    });
  }

  function dropChessAdd(target: Chess, xy: string) {
    chsssListPush(target, xy);
  }

  function dropChessUpdate(start: string, end: string, key: number) {
    setTarget((state) => {
      return state.map((item) => {
        if (item.position[key] === start) {
          item.position[key] = end;
        }
        return item;
      });
    });
  }
  function dropChessPosition(start: string, end: string, key: number) {
    setTarget((state) => {
      const startIndex = state.findIndex(
        (item) => item.position[key] === start
      );
      const endIndex = state.findIndex((item) => item.position[key] === end);
      return state.map((item, index) => {
        if (index == startIndex) {
          item.position[key] = end;
        }
        if (index == endIndex) {
          item.position[key] = start;
        }
        return item;
      });
    });
  }

  return (
    <>
      <div className="w-100% h-100% details-page overflow-y-auto p-y-100px p-x-24px flex items-start">
        <BattleContext.Provider
          value={{
            stanceKey,
            setStanceKey,
            clickPushHero,
            dropChessAdd,
            dropChessUpdate,
            dropChessPosition,
            targetList,
            setTarget,
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
