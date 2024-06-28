/*
 * @Author: yjl
 * @Date: 2024-06-24 11:52:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 16:01:18
 * @Description: 描述
 */
import BoxTitle from "./box-title";
import SelectItem from "./select-box";
import { useBattle, getHexInfo } from "../util";
import { useState } from "react";
import BattleModal from "@/components/Modal/BattleModal";
import HexConter from "../modal/hex-conter";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";

type Priority = "priority" | "alternative";
export default function HexAnalyse() {
  const { hex } = useSelector(getBattleInfo);
  const {
    analyseData: { hexAnalyse },
    setAnalyseData,
  } = useBattle();
  const { hexList, alternative } = hexAnalyse;
  console.log(hexList, alternative);

  const [priority, setPriority] = useState<Priority>("priority");
  const [hexModalOpen, setHexModalOpen] = useState<boolean>(false);

  function showHexModal(type: Priority) {
    setPriority(type);
    setHexModalOpen(true);
  }
  function hexSelect(hexId) {
    setAnalyseData((state) => {
      const {
        hexAnalyse: { hexList: priorityList, alternative: alternativeList },
      } = state;
      if (priority == "priority") {
        let findIndex = priorityList.findIndex((item) => !item);
        if (findIndex !== -1) {
          priorityList[findIndex] = hexId;
        }
      } else {
        let findIndex = alternativeList.findIndex((item) => !item);
        if (findIndex !== -1) {
          alternativeList[findIndex] = hexId;
        }
      }
      return {
        ...state,
        hexAnalyse: {
          hexList: priorityList,
          alternative: alternativeList,
        },
      };
    });
    setHexModalOpen(false);
  }

  function deleteHex(index: number, type: Priority) {
    setAnalyseData((state) => {
      let {
        hexAnalyse: { hexList: priorityList, alternative: alternativeList },
      } = state;
      if (type == "priority") {
        priorityList = priorityList.filter((_item, i) => i !== index);
        priorityList.push("");
      } else {
        alternativeList = alternativeList.filter((_item, i) => i !== index);
        alternativeList.push("");
      }
      return {
        ...state,
        hexAnalyse: {
          hexList: priorityList,
          alternative: alternativeList,
        },
      };
    });
  }

  return (
    <div className="w-100% !p-b-50px right-box">
      <BoxTitle
        title="强化分析"
        desc="*强化符文中涉及羁绊加成的，将合并统计羁绊数量"
      />
      <span className="c-#f1f2f8 m-y-16px inline-block">强化符文</span>
      <div className="flex items-center ">
        <span className="c-#4e5672 m-r-16px inline-block">优选</span>
        {hexList.map((item, index) => {
          return (
            <SelectItem
              key={"priority" + item + index}
              selectInfo={getHexInfo(item, hex)}
              isRadius={true}
              isDelete={true}
              className="m-r-10px"
              deleteCbk={() => {
                deleteHex(index, "priority");
              }}
              showModal={() => {
                showHexModal("priority");
              }}
            />
          );
        })}
        <span className="c-#4e5672 m-x-16px inline-block">次选</span>
        {alternative.map((item, index) => {
          return (
            <SelectItem
              key={"alternative" + item + index}
              selectInfo={getHexInfo(item, hex)}
              isRadius={true}
              isDelete={true}
              deleteCbk={() => {
                deleteHex(index, "alternative");
              }}
              className="m-r-10px"
              showModal={() => {
                showHexModal("alternative");
              }}
            />
          );
        })}
      </div>

      <BattleModal
        footer={null}
        open={hexModalOpen}
        title="强化符文"
        width="700px"
        centered
        // destroyOnClose={true}
        onCancel={() => {
          setHexModalOpen(false);
        }}
      >
        <HexConter
          activeKeys={[...hexList, ...alternative].filter((item) => item)}
          onSelect={hexSelect}
        />
      </BattleModal>
    </div>
  );
}
