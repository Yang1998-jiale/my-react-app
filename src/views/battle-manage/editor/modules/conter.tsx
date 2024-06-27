/*
 * @Author: yjl
 * @Date: 2024-05-13 14:10:27
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-27 16:49:33
 * @Description: 描述
 */
import Final from "../component/final-position";
import { useBattle, Stance, PositionList } from "../util";
import Fetter from "../component/fetter";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";

export default function Conter() {
  const {
    stanceKey,
    setStanceKey,
    targetList,
    setTarget,
    maxLength,
    setMaxLength,
  } = useBattle();
  const [positonKey, setPositionKey] = useState<number | string>(0);
  const { equip: equipList } = useSelector(getBattleInfo);
  const Crown = useMemo(() => {
    return equipList.find(
      (item) => item.name === "金铲铲冠冕" || item.keywords == "可上阵人数+1"
    );
  }, [equipList]);
  useEffect(() => {
    const len = targetList.reduce((pre, item) => {
      return (pre += item.equipID.filter((f) => f === Crown.id).length);
    }, 0);

    const baseLen = stanceKey === 1 ? 10 : stanceKey === 2 ? 5 : 7;
    setMaxLength(baseLen + len);
  }, [targetList, stanceKey]);

  return (
    <>
      <div className="flex-1  bg-[rgba(26,31,58,.5)] min-h-40% flex flex-col m-x-16px p-24px b-rd-8px">
        <div className="c-#fff flex items-center">
          <div className="flex items-center flex-1">
            <span className="text-18px m-r-16px">阵容占位</span>
            <span>
              人口数:
              {targetList.filter((item) => item.chessType == "hero")?.length ||
                0}
              /{maxLength}
            </span>
          </div>
          <div className="flex items-center m-r-16px">
            {Stance.map((item) => (
              <div
                style={
                  stanceKey === item.value
                    ? {
                        background: "#c174e8",
                        color: "#fff",
                      }
                    : {}
                }
                onClick={() => setStanceKey(item.value)}
                key={item.key}
                className="text-center w-80px p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#c174e8 cursor-pointer hover-b-[#c174e8]"
              >
                {item.label}
              </div>
            ))}
          </div>
          <div
            className="p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#c174e8 cursor-pointer hover-b-[#c174e8]"
            onClick={() => {
              setTarget(() => {
                return [];
              });
            }}
          >
            重置棋盘
          </div>
        </div>
        <div className="flex-1 m-y-24px m-t-56px">
          {/* {stanceKey == 1 ? <Final heroList={finalHeroList} /> : <div></div>} */}
          {stanceKey === 1 ? (
            <div className="flex items-center m-r-16px justify-end m-b-16px">
              {PositionList.map((item) => (
                <div
                  style={
                    positonKey == item.value
                      ? {
                          color: "#fff",
                          borderColor: "#fff",
                        }
                      : {}
                  }
                  onClick={() => setPositionKey(item.value)}
                  key={item.value}
                  className="text-center w-80px p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)]  b-rd-2px hover-c-#fff cursor-pointer hover-b-#fff"
                >
                  {item.label}
                </div>
              ))}
            </div>
          ) : null}
          <Final
            heroList={targetList}
            positonKey={stanceKey == 1 ? (positonKey as number) : 0}
          />
        </div>
        <Fetter />
      </div>
    </>
  );
}
