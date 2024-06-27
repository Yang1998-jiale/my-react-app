import { memo } from "react";

/*
 * @Author: yjl
 * @Date: 2024-06-19 15:49:59
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-19 17:53:59
 * @Description: 描述
 */
const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
interface Props {
  fetter: any;
  chess: any[];
}
function Content({ fetter, chess }: Props) {
  function getLevelColor(key) {
    const target = fetter.job_color_list || fetter.race_color_list;
    const findLevel = target
      .split(",")
      .find((item) => item.split(":")[0] == key);
    return findLevel ? findLevel.split(":")[1] : 1;
  }

  function getHeroList() {
    const key = fetter.jobId ? "jobId" : "raceId";
    const target = fetter[key];

    return (
      chess
        .filter((item) => item[key + "s"].includes(target))
        .sort((a, b) => a.price - b.price) || []
    );
  }

  return (
    <>
      <div className="w-450px min-h-300px c-#fff p-y-20px">
        <div className="flex items-center p-r-20px">
          <img
            src={fetter.imagePath}
            className="w-18px h-18px img-filter"
            alt=""
          />
          <span className="text-16px m-l-30px"> {fetter.name}</span>
        </div>
        <div className="p-x-20px line-height-loose c-#606e8c m-y-16px">
          {fetter.introduce}
        </div>
        <div className="m-x-20px b-y-1px b-y-solid b-y-#23294a p-y-16px">
          {Object.keys(fetter.level).map((key, index) => {
            return (
              <div
                className="m-y-12px flex line-height-normal"
                key={key + "" + index}
              >
                <span
                  className={`inline-block w-20px h-20px flex text-14px justify-center items-center flex-shrink-0 ${
                    getLevelColor(key) == 4 ? "c-#000" : "c-#fff"
                  }  level-color-${getLevelColor(key)}`}
                >
                  {key}
                </span>
                <span
                  className="m-l-12px text-14px c-#606e8c
                "
                >
                  {fetter.level[key]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center p-x-20px m-t-16px">
          <span className="flex-shrink-0 c-#7e807d m-b-10px">英雄：</span>
          <div className="flex items-end flex-1 flex-wrap  ">
            {getHeroList().map((item) => {
              return (
                <div
                  key={item.id}
                  className={`w-36px h-36px b-rd-50% b-2px b-solid overflow-hidden m-r-10px m-b-10px ${
                    item.price ? "chess-bd-" + item.price : ""
                  } `}
                >
                  <img
                    src={minUrl + item.name}
                    className="w-100% h-100%
                  "
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
const FetterContent = memo(Content);
export default FetterContent;
