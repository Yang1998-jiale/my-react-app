/*
 * @Author: yjl
 * @Date: 2024-06-13 16:08:56
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-27 10:49:37
 * @Description: 描述
 */
import { useState, useEffect } from "react";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useBattle, getEquipInfo } from "../util";
import { PopoverBox } from "@/components/Popover/index";
import FetterContent from "../modal/fetter-content";

export default function Fetter() {
  const [fetterList, setFetterList] = useState<any>([]);
  const { targetList } = useBattle();
  const {
    chess: chessList,
    job: jobList,
    race: raceList,
    equip: equipList,
  } = useSelector(getBattleInfo);
  useEffect(() => {
    const raceInfo = {};
    const jobInfo = {};
    const heroIds = targetList
      .filter((item) => item.chessType === "hero")
      .map((item) => item.heroID);
    const heroList = chessList.filter((item) => heroIds.includes(item.id));

    const equipIds = targetList
      .reduce((pre, item) => {
        return [...pre, ...item.equipID];
      }, [])
      .filter((item) => item);
    equipIds.forEach((item) => {
      const equip = getEquipInfo(item, equipList);
      console.log(equip);

      if (Number(equip.raceId)) {
        if (raceInfo[equip.raceId]) {
          raceInfo[equip.raceId].equip.push({
            equip,
          });
        } else {
          raceInfo[equip.raceId] = {
            equip: [equip],
            chess: [],
          };
        }
      }
      if (Number(equip.jobId)) {
        if (jobInfo[equip.jobId]) {
          jobInfo[equip.jobId].equip.push(equip);
        } else {
          jobInfo[equip.jobId] = {
            equip: [equip],
            chess: [],
          };
        }
      }
    });

    heroList.forEach((item) => {
      const raceIds = item.raceIds.split(",");
      const jobIds = item.jobIds.split(",");
      //查找特质
      raceIds.forEach((raceId) => {
        if (raceInfo[raceId]) {
          if (!raceInfo[raceId].chess.find((f) => f.id == item.id)) {
            raceInfo[raceId].chess.push(item);
          }
        } else {
          raceInfo[raceId] = {
            chess: [item],
          };
        }
      });
      //查找职业
      jobIds.forEach((jobId) => {
        if (jobInfo[jobId]) {
          if (!jobInfo[jobId].chess.find((f) => f.id == item.id)) {
            jobInfo[jobId].chess.push(item);
          }
        } else {
          jobInfo[jobId] = {
            chess: [item],
          };
        }
      });
    });
    //根据特质id 生成羁绊数
    const raceData = Object.keys(raceInfo)
      .map((key) => {
        const race = raceList.find((r) => r.raceId == key);
        if (race) {
          let num =
            raceInfo[key].chess.length + (raceInfo[key]?.equip?.length || 0);
          return {
            ...race,
            levelColor: getlevelColor(race.race_color_list, num),
            num,
          };
        }
        return undefined;
      })
      .filter((item) => item);
    //根据职业id 生成羁绊数
    const jobData = Object.keys(jobInfo)
      .map((key) => {
        const job = jobList.find((r) => r.jobId == key);
        if (job) {
          let num =
            jobInfo[key].chess.length + (jobInfo[key]?.equip?.length || 0);
          return {
            ...job,
            levelColor: getlevelColor(
              job.job_color_list,
              jobInfo[key].chess.length
            ),
            num,
          };
        }
        return undefined;
      })
      .filter((item) => item);
    setFetterList(() =>
      [...raceData, ...jobData].sort((a, b) => {
        if (a.levelColor == b.levelColor) {
          return b.num - a.num;
        }
        return b.levelColor - a.levelColor;
      })
    );
  }, [targetList, chessList, raceList, jobList]);

  function getlevelColor(target, nums) {
    const levelColor = target.split(",");
    let level = 0;
    for (let i = 0; i < levelColor.length; i++) {
      const item = levelColor[i];
      const num = item.split(":")[0];
      const color = item.split(":")[1];
      if (nums >= num) {
        level = color;
      }
    }

    return level;
  }

  return (
    <>
      <div className="w-100% h-100%  flex items-center flex-wrap">
        {fetterList.map((item) => {
          return (
            <PopoverBox
              key={item.jobId || item.raceId}
              content={<FetterContent fetter={item} chess={chessList} />}
              rootClassName={"chess-popover"}
            >
              <div className="flex items-center relative flex-shrink-0 m-r-12px m-b-12px cursor-pointer">
                <div
                  className={`fetter w-32px h-36px absolute  level-${item.levelColor}  flex items-center justify-center`}
                >
                  <img
                    src={item.imagePath}
                    className="w-18px h-18px img-icon"
                    alt=""
                  />
                </div>
                <div
                  className={` b-1px b-solid  p-l-16px p-r-8px m-l-16px text-14px b-#212744 p-y-2px ${
                    item.levelColor !== 0 ? "c-#6c7493" : "c-#2f3552  "
                  }`}
                >
                  <span className="m-x-4px">{item.num}</span>
                  <span>{item.name}</span>
                </div>
              </div>
            </PopoverBox>
          );
        })}
      </div>
    </>
  );
}
