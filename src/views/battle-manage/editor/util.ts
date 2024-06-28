/*
 * @Author: yjl
 * @Date: 2024-05-29 10:43:48
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 15:49:43
 * @Description: 描述
 */
import { createContext, useContext } from "react";
import type { Chess, Tabs } from "@/types/battle";
const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";

export const BattleContext = createContext<any>(null);

export function createHero(heroID: string, chessType: string = "hero"): Chess {
  return {
    chessType,
    heroID,
    equipID: new Array(5).fill(""),
    position: [],
    isCarry: false,
    isChosen: false,
  };
}

export const useBattle = () => {
  return useContext(BattleContext);
};

export const Stance: Tabs[] = [
  {
    key: 1,
    value: 1,
    label: "最终站位",
    num: 10,
  },
  {
    key: 2,
    value: 2,
    label: "前期",
    num: 5,
  },
  {
    key: 3,
    value: 3,
    label: "中期",
    num: 7,
  },
];

export const EquipType: Tabs[] = [
  {
    label: "基础装备",
    value: 1,
    key: 1,
  },
  {
    label: "合成装备",
    value: 2,
    key: 2,
  },
  {
    label: "光明装备",
    value: 3,
    key: 3,
  },
  {
    label: "特殊装备",
    value: 4,
    key: 4,
  },
  {
    label: "转职纹章",
    value: 5,
    key: 5,
  },
  {
    label: "奥恩神器",
    value: 6,
    key: 6,
  },
  {
    label: "金鳞龙装备",
    value: 7,
    key: 7,
  },
  {
    label: "辅助装备",
    value: 8,
    key: 8,
  },
];

export const HexType: Tabs[] = [
  {
    label: "一级强化符文",
    value: 1,
    key: 1,
  },
  {
    label: "二级强化符文",
    value: 2,
    key: 2,
  },
  {
    label: "三级强化符文",
    value: 3,
    key: 3,
  },
];

export const PositionList: Tabs[] = [
  {
    label: "站位一",
    value: 0,
    key: 0,
  },
  {
    label: "站位二",
    value: 1,
    key: 1,
  },
];

export function chessFormart(target: any[]) {
  const newTarget = new Array(6).fill(undefined);
  if (!target.length) return [];
  target.forEach((item) => {
    const price = Number(item.price);
    if (["7965", "7593"].includes(item.id)) {
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
  return newTarget.filter((item) => item?.price);
}

export function getEquipInfo(equipId: string | number, target: any[]) {
  if (!equipId) {
    return;
  }
  return target.find((item) => item.id === equipId);
}

export function getHeroInfo(heroId: string | number, target: any[]) {
  if (!heroId) {
    return;
  }
  let findObj = target.find((item) => item.id === heroId);
  if (findObj) {
    let obj = {
      ...findObj,
      imagePath: minUrl + findObj.name,
    };
    return obj;
  }
  return;
}

export function getHexInfo(hexId: string | number, target: any[]) {
  if (!hexId) {
    return;
  }
  let findObj = target.find((item) => item.id === hexId);
  if (findObj) {
    let obj = {
      ...findObj,
      imagePath: findObj.imgUrl,
    };
    return obj;
  }
}
