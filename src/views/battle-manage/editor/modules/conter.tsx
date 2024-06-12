/*
 * @Author: yjl
 * @Date: 2024-05-13 14:10:27
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-12 17:23:38
 * @Description: 描述
 */
import Final from "../component/final-position";
import { useBattle, Stance, PositionList } from "../util";
import { useState, useEffect } from "react";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";

export default function Conter() {
  const { stanceKey, setStanceKey, targetList, setTarget } = useBattle();
  const {
    chess: chessList,
    // job: jobList,
    // race: raceList,
    // equip: equipList,
  } = useSelector(getBattleInfo);
  const [positonKey, setPositionKey] = useState<number | string>(0);
  function getMaxNum() {
    return Stance.find((item) => item.value === stanceKey)?.num || 10;
  }

  useEffect(() => {
    const raceList = {};

    const heroIds = targetList
      .filter((item) => item.chessType === "hero")
      .map((item) => item.heroID);
    const heroList = chessList.filter((item) => heroIds.includes(item.id));

    heroList.forEach((item) => {
      const raceIds = item.raceIds.split(",");
      raceIds.forEach((raceId) => {
        if (raceList[raceId]) {
          console.log(
            raceList[raceId].chess.find((f) => f.heroID == item.heroID)
          );

          if (!raceList[raceId].chess.find((f) => f.id == item.id)) {
            raceList[raceId].chess.push(item);
          }
        } else {
          raceList[raceId] = {
            chess: [item],
          };
        }
      });
    });
    console.log(raceList);
  }, [targetList, chessList]);

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
              /{getMaxNum()}
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
      </div>
    </>
  );
}
