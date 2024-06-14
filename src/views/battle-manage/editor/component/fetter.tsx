/*
 * @Author: yjl
 * @Date: 2024-06-13 16:08:56
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-14 16:43:08
 * @Description: 描述
 */
import { useState, useEffect } from "react";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useBattle } from "../util";

export default function Fetter() {
  const [fetterList, setFetterList] = useState<any>([]);
  const { targetList } = useBattle();
  const {
    chess: chessList,
    job: jobList,
    race: raceList,
  } = useSelector(getBattleInfo);
  useEffect(() => {
    const raceInfo = {};
    const jobInfo = {};
    const heroIds = targetList
      .filter((item) => item.chessType === "hero")
      .map((item) => item.heroID);
    const heroList = chessList.filter((item) => heroIds.includes(item.id));

    heroList.forEach((item) => {
      const raceIds = item.raceIds.split(",");
      const jobIds = item.jobIds.split(",");
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
    const raceData = Object.keys(raceInfo)
      .map((key) => {
        const race = raceList.find((r) => r.raceId == key);
        if (race) {
          return {
            ...race,
            levelColor: getlevelColor(
              race.race_color_list,
              raceInfo[key].chess.length
            ),
            chess: raceInfo[key].chess,
          };
        }
        return undefined;
      })
      .filter((item) => item);
    const jobData = Object.keys(jobInfo)
      .map((key) => {
        const job = jobList.find((r) => r.jobId == key);
        if (job) {
          return {
            ...job,
            levelColor: getlevelColor(
              job.job_color_list,
              jobInfo[key].chess.length
            ),
            chess: jobInfo[key].chess,
          };
        }
        return undefined;
      })
      .filter((item) => item);
    setFetterList(() =>
      [...raceData, ...jobData].sort((a, b) => {
        if (a.levelColor == b.levelColor) {
          return b.chess.length - a.chess.length;
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
      <div className="w-100% h-100% cursor-pointer flex items-center flex-wrap">
        {fetterList.map((item) => {
          return (
            <div
              key={item.jobId || item.raceId}
              className="flex items-center relative flex-shrink-0 m-r-12px m-b-12px"
            >
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
                <span className="m-x-4px">{item.chess.length}</span>
                <span>{item.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
