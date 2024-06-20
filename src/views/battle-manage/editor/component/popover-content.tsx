/*
 * @Author: yjl
 * @Date: 2024-05-10 09:15:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-20 15:25:40
 * @Description: 描述
 */
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const maxUrl = baseURl + "tftstore/s11/624x318/";
interface Props {
  info: any;
  type: string;
  baseInfo?: any;
}
export default function Content({ info, type, baseInfo }: Props) {
  const { race, job } = useSelector(getBattleInfo);
  const [formula, setFormula] = useState<any[]>([]);

  useEffect(() => {
    if (info.formula) {
      const formulaIDS = info.formula.split(",");

      if (formulaIDS[0] == formulaIDS[1]) {
        const findObj = baseInfo.find((item) => item.equipId == formulaIDS[0]);
        if (findObj) {
          setFormula([findObj, findObj]);
        }
      } else {
        const filterObj = baseInfo.filter((item) =>
          formulaIDS.includes(item.equipId)
        );
        setFormula(filterObj);
      }
    }
  }, [info, baseInfo]);
  if (type == "chess") {
    const raceInfo =
      race.filter((item) => info.raceIds.split(",").includes(item.raceId)) ||
      [];
    const jobInfo =
      job.filter((item) => info.jobIds.split(",").includes(item.jobId)) || [];

    const raceJob = [...raceInfo, ...jobInfo];

    return (
      <div className="flex c-#fff">
        {/* <img
          src={maxUrl + info.TFTID + ".jpg"}
          
          alt=""
        /> */}
        <div
          className="w-441px h-284px"
          style={{
            background: `url(${maxUrl + info.TFTID + ".jpg"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-441px h-284px flex flex-col justify-between">
          <div className="flex  flex-shrink-0 h-90px">
            <div className="w-70% p-12px flex  flex-col justify-center">
              {raceJob.map((item) => (
                <div className="flex items-center" key={item.id}>
                  <img
                    src={item.imagePath}
                    className="w-16px h-16px img-filter"
                    alt=""
                  />
                  <span className="c-#fff m-l-24px">{item.name}</span>
                </div>
              ))}
            </div>
            {Number(info.price) ? (
              <div className="w-30% b-l-1px b-l-solid b-l-#4e567290 p-12px flex items-center justify-center">
                {info.price}金币
              </div>
            ) : null}
          </div>
          <div className="flex items-center flex-1 p-x-24px p-y-12px b-1px b-solid b-#4e567290 b-x-none">
            <img src={info.skillImage} className="w-40px h-40px" alt="" />
            <div className="flex flex-col items-center m-x-16px flex-shrink-0">
              <span>{info.skillName}</span>
              <span>{info.skillType}</span>
            </div>
            <div className="c-#4e5699 ellipsis">{info.skillDetail}</div>
          </div>
          <div className="flex p-20px flex-shrink-0">
            <span className="inline-block w-30px">推荐装备</span>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    );
  } else if (type == "equip") {
    return (
      <div className="w-400px p-24px c-#fff">
        <div className="flex items-center">
          <img src={info.imagePath} className="w-60px h-60px" alt="" />
          <span className="text-18px m-l-12px">{info.name}</span>
        </div>
        <div className="c-#999 m-t-16px text-18px">{info.effect}</div>
        {info.type == 2 ? (
          <div className="b-t-1px b-t-solid b-t-#c0c0c050 m-t-16px flex items-center p-t-16px">
            <span className="text-16px m-r-8px">合成:</span>
            <div>
              {formula.map((item: any, index) => (
                <img
                  src={item?.imagePath}
                  key={item.id + "" + index}
                  alt=""
                  className="w-40px w-40px m-r-8px"
                />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
  return undefined;
}
