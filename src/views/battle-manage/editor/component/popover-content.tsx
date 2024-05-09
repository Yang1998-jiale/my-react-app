import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const maxUrl = baseURl + "tftstore/s11/624x318/";

export default function Content({ info, type }) {
  const { race, job } = useSelector(getBattleInfo);

  if (type == "chess") {
    let raceInfo =
      race.filter((item) => info.raceIds.split(",").includes(item.raceId)) ||
      [];
    let jobInfo =
      job.filter((item) => info.jobIds.split(",").includes(item.jobId)) || [];

    let raceJob = [...raceInfo, ...jobInfo];

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
        <div className="w-441px h-284px flex flex-col justify-be tween">
          <div className="flex  flex-shrink-0 h-90px">
            <div className="w-70% p-12px flex  flex-col justify-center">
              {raceJob.map((item) => (
                <>
                  <div className="flex items-center">
                    <img
                      src={item.imagePath}
                      className="w-16px h-16px img-filter"
                      alt=""
                    />
                    <span className="c-#fff m-l-24px">{item.name}</span>
                  </div>
                </>
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
    return <div>我是装备</div>;
  }
  return undefined;
}
