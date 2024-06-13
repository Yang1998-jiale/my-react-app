/*
 * @Author: yjl
 * @Date: 2024-06-13 16:08:56
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-13 18:01:21
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
          console.log(
            raceInfo[raceId].chess.find((f) => f.heroID == item.heroID)
          );

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
        if (raceInfo[jobId]) {
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
    console.log(raceInfo, jobInfo);
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
    setFetterList(() => [...raceData, ...jobData]);
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
      <div className="w-100% h-100% cursor-pointer">
        {fetterList.map((item) => {
          return (
            <div key={item.jobId || item.raceId}>
              <div className={`fetter w-32px h-36px level-${item.levelColor} flex items-center justify-center`}>
                <img src={item.imagePath} className="w-18px h-18px" alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
