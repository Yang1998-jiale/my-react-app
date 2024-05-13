import { Popover, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Content from "./popover-content";
import { useState, useEffect } from "react";
// import "../../style/chess.less";
import { drap } from "@/utils/drap";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";

function chessFormart(target) {
  const newTarget = new Array(6).fill(undefined);
  if (!target.length) return [];
  target.forEach((item) => {
    const price = Number(item.price);
    if (item.id == "7593") {
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
//棋子组件
export default function Chess({ chessList, jobList, raceList }) {
  const [chessData, setChessData]: any = useState([]);
  const [formState, setFormState] = useState<{
    keyword: string | undefined;
    jobID: string | undefined;
    raceID: string | undefined;
  }>({
    keyword: undefined,
    jobID: undefined,
    raceID: undefined,
  });

  useEffect(() => {
    const allData = chessFormart(chessList);
    setChessData(allData);
  }, [chessList]);

  useEffect(() => {
    const { keyword, jobID, raceID } = formState;

    let filterData = chessList;
    if (keyword) {
      filterData = chessList.filter(
        (item) =>
          item.displayName.indexOf(keyword) != -1 ||
          item.title.indexOf(keyword) != -1
      );
    }
    if (jobID && jobID != "all") {
      filterData = filterData.filter((item) =>
        item.jobIds.split(",").includes(jobID)
      );
    }
    if (raceID && raceID != "all") {
      filterData = filterData.filter((item) =>
        item.raceIds.split(",")?.includes(raceID)
      );
    }
    const allData = chessFormart(filterData);
    setChessData(allData);
  }, [formState]);

  return (
    <div className="w-100% h-100% flex flex-col relative ">
      <div className="sticky top-0 left-0 ">
        <Input
          onChange={({ target: { value } }) => {
            setFormState({ ...formState, keyword: value });
          }}
          prefix={<SearchOutlined />}
          placeholder="请输入英雄名称"
          value={formState.keyword}
          className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
        />
        <div className="m-y-16px">
          <Select
            className="w-50%  select-item"
            popupClassName="drop-item"
            placeholder="请选择特质"
            value={formState.raceID}
            onChange={(value) => {
              setFormState({
                ...formState,
                raceID: value == "all" ? undefined : value,
              });
            }}
            options={[
              { label: "全部", value: "all" },
              ...raceList.map((item) => {
                return {
                  ...item,
                  label: item.name,
                  value: item.raceId,
                };
              }),
            ]}
          />
          <Select
            className="w-50%  select-item"
            popupClassName="drop-item"
            placeholder="请选择职业"
            value={formState.jobID}
            onChange={(value) => {
              setFormState({
                ...formState,
                jobID: value == "all" ? undefined : value,
              });
            }}
            options={[
              { label: "全部", value: "all" },
              ...jobList.map((item) => {
                return {
                  ...item,
                  label: item.name,
                  value: item.jobId,
                };
              }),
            ]}
          />
        </div>
      </div>
      <div className="left-box flex-1 m-t-8px overflow-auto">
        {chessData.length
          ? chessData.map((item: any) => {
              return (
                <div className="c-#fff" key={item.price}>
                  <h4 className="!m-t-0 m-b-8px">{item.price + "费"}</h4>
                  <div className="flex flex w-100% flex-wrap">
                    {item.chessList.map((item) => {
                      return (
                        <Popover
                          content={<Content info={item} type={"chess"} />}
                          rootClassName={"chess-popover"}
                          key={item.id}
                        >
                          <img
                            draggable="true"
                            onDrag={() => {
                              drap(item);
                            }}
                            src={minUrl + item.name}
                            className="w-50px h-50px m-r-8px m-b-8px cursor-pointer"
                            alt=""
                          />
                        </Popover>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : "暂无数据"}
      </div>
    </div>
  );
}
