/*
 * @Author: yjl
 * @Date: 2024-04-30 10:09:14
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-20 15:35:23
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
  const [agoHeroList, setAgoHeroList] = useState<Chess[]>([]);
  const [centreHeroList, setCentreHeroList] = useState<Chess[]>([]);
  const [stanceKey, setStanceKey] = useState<number | string>(1);
  const [maxLength, setMaxLength] = useState<number>(10);
  const dispatch = useDispatch();
  const targetList = useMemo(() => {
    if (stanceKey === 1) {
      return finalHeroList;
    } else if (stanceKey == 2) {
      return agoHeroList;
    } else if (stanceKey == 3) {
      return centreHeroList;
    }
    return [];
  }, [stanceKey, finalHeroList, agoHeroList, centreHeroList]);
  const basePosition = useMemo(() => {
    const list: string[] = [];
    for (let i = 0; i < maxLength; i++) {
      list.push(`${Math.floor(i / 7)},${i % 7}`);
    }
    return list;
  }, [maxLength]);

  function setTarget(setFn: SetFn) {
    if (typeof setFn !== "function") {
      return TypeError("参数为函数");
    }
    if (stanceKey == 1) {
      setFinalHeroList((state) => setFn(state));
    }
    if (stanceKey == 2) {
      setAgoHeroList((state) => setFn(state));
    }
    if (stanceKey == 3) {
      setCentreHeroList((state) => setFn(state));
    }
  }

  useEffect(() => {
    const len = targetList.reduce((pre, item) => {
      return (pre += item.equipID.filter((f) => f === "27734").length);
    }, 0);

    const baseLen = stanceKey === 1 ? 10 : stanceKey === 2 ? 5 : 7;
    setMaxLength(baseLen + len);
  }, [targetList, stanceKey]);

  useEffect(() => {
    dispatch(initData() as any);
  });

  function clickPushHero(heroID: string) {
    const chessObj = createHero(heroID);
    chsssListPush(chessObj);
  }

  function chsssListPush(target: Chess) {
    const filterHero = targetList.filter((item) => item.chessType == "hero");
    if (filterHero?.length >= maxLength) {
      message.error(`阵容中英雄数量超过${maxLength}个`);
      return;
    }
    target.position = [getFirstPositoon(0), getFirstPositoon(1)];
    setTarget((state) => {
      return [...state, target];
    });
  }

  function getFirstPositoon(index): string {
    const p = targetList.map((item) => item.position[index]);
    const xy: string | number =
      basePosition.find((item) => !p.includes(item)) || "0,0";
    return xy;
  }

  function dropChessAdd(target: Chess, xy: string, key) {
    const filterHero = targetList.filter((item) => item.chessType == "hero");
    if (filterHero?.length >= maxLength) {
      message.error(`阵容中英雄数量超过${maxLength}个`);
      return;
    }
    target.position = new Array(2);
    target.position[key] = xy;
    target.position[Math.abs(1 - key)] = getFirstPositoon(Math.abs(1 - key));
    setTarget((state) => {
      return [...state, target];
    });
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

  function dropReplaceChess(position, key, heroID) {
    setTarget((state) => {
      return state.map((item) => {
        if (item.position[key] === position) {
          item.heroID = heroID;
          item.equipID = [];
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

  function deleteHero(position, key) {
    setTarget((state) => {
      return state.filter((item) => item.position[key] !== position);
    });
  }

  function updateChessEquip(chess, key) {
    setTarget((state) => {
      return state.map((item) => {
        if (item.position[key] === chess.position[key]) {
          return chess;
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
            dropReplaceChess,
            targetList,
            setTarget,
            deleteHero,
            updateChessEquip,
            maxLength,
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
