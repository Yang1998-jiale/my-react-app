/*
 * @Author: yjl
 * @Date: 2024-05-22 16:44:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-02 10:06:05
 * @Description: 描述
 */

import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useBattle } from "@/views/battle-manage/editor/util";
import type { Chess } from "@/types/battle";
import EquipItem from "./equip-item";
import { message } from "antd";
import BattleModal from "@/components/Modal/BattleModal";
import EquipConter from "../../../modal/equip-conter";
import { useState } from "react";
import carryIcon from "@/assets/images/icon-carry-hero.png";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
interface Props {
  info: Chess;
  index: number;
  positonKey: number;
}

function Star() {
  return <div className="w-12px h-20px star-box"></div>;
}
export default function CenterBox({ info, index, positonKey = 0 }: Props) {
  const {
    dropChessPosition,
    dropReplaceChess,
    deleteHero,
    updateChessEquip,
    analyseData,
  } = useBattle();
  const { priorityStars } = analyseData;
  const { chess: chessList, equip: equipList } = useSelector(getBattleInfo);
  const detail = chessList.find((item) => item.id == info.heroID);
  const [equipModalOpen, setEquipModalOpen] = useState(false);

  function dropFn(e: React.DragEvent) {
    const type = e.dataTransfer.getData("type");

    if (type == "equip") {
      const equipID = e.dataTransfer.getData("equipID");
      addEquip(equipID);
    } else {
      dropChess(e);
    }
  }

  function dropChess(e: React.DragEvent) {
    const action = e.dataTransfer.getData("action");
    const xy = `${Math.floor(index / 7)},${index % 7}`;
    if (action == "add") {
      const chessID = e.dataTransfer.getData("chessID");
      dropReplaceChess(xy, positonKey, chessID);
    } else {
      const targetXY = e.dataTransfer.getData("chessXY");
      dropChessPosition(targetXY, xy, positonKey);
    }
  }

  function addEquip(equipID) {
    const emptyIndex = info.equipID.findIndex((item) => !item);
    if (emptyIndex == -1) {
      return;
    }
    const equipData = getEquipInfo(equipID);
    if (
      Number(equipData.raceId) &&
      (detail.raceIds.includes(equipData.raceId) ||
        info.equipID.includes(equipData.id))
    ) {
      message.error("拥有相同羁绊的英雄无法穿戴该装备");
      return;
    }
    if (
      Number(equipData.jobId) &&
      (detail.jobIds.includes(equipData.jobId) ||
        info.equipID.includes(equipData.id))
    ) {
      message.error("拥有相同羁绊的英雄无法穿戴该装备");
      return;
    }
    info.equipID[emptyIndex] = equipID;
    updateChessEquip(info, positonKey);
  }

  function ondragstart(e: React.DragEvent<HTMLDivElement>) {
    const dt = e.dataTransfer;
    dt.setData("chessXY", info.position[positonKey] as string);
    dt.setData("action", "update");
  }

  function getEquipInfo(equipID: string | undefined) {
    if (!equipID) {
      return undefined;
    }
    const equip = equipList.find((item) => item.id == equipID);
    return equip;
  }

  function equipClick(index, action) {
    if (action == "delete") {
      info.equipID = info.equipID.filter((_item, i) => i != index);
      info.equipID.push("");
      updateChessEquip(info, positonKey);
    } else if (action == "add") {
      setEquipModalOpen(true);
    }
  }

  function equipSelect(equipID: undefined | string, _equipInfo?: any) {
    if (equipID) {
      // console.log(equipID);
      addEquip(equipID);
    }
    setEquipModalOpen(false);
  }

  return (
    <div className="relative">
      <div
        onDrop={(e) => {
          dropFn(e);
        }}
        onDragStart={(e) => {
          ondragstart(e);
        }}
        draggable="true"
        onClick={() => {
          deleteHero(info.position[positonKey], positonKey);
        }}
        className={`chess-box  relative ${
          detail?.price ? "price-" + detail.price : ""
        } z-11`}
      >
        <i
          className={`w-100% h-100% bg-img  `}
          style={{ background: `url(${minUrl + detail?.name})` }}
        ></i>
      </div>
      {priorityStars.includes(info.heroID) ? (
        <div className="absolute top-[-7px] left-50% translate-x-[-48%] z-100 flex items-center">
          <Star /> <Star /> <Star />
        </div>
      ) : (
        <div className="absolute top-[-7px] left-50% translate-x-[-50%] z-100 flex items-center">
          <Star />
        </div>
      )}
      <div className="flex items-center absolute bottom-[2px] left-50%  translate-[-50%,50%] z-100">
        {new Array(3).fill("").map((item, index) => {
          return (
            <EquipItem
              equipInfo={getEquipInfo(info.equipID[index])}
              clickFn={equipClick}
              index={index}
              key={item + index}
            />
          );
        })}
      </div>
      {info.isCarry && (
        <div className="w-20px h-23px absolute top-50% right-0 translate-[50%,-50%] z-101">
          <img src={carryIcon} alt="" className="w-100% h-100%" />
        </div>
      )}
      <BattleModal
        footer={null}
        open={equipModalOpen}
        title="装备"
        width="700px"
        centered
        // destroyOnClose={true}
        onCancel={() => {
          setEquipModalOpen(false);
        }}
      >
        <EquipConter type="all" onSelect={equipSelect} />
      </BattleModal>
    </div>
  );
}
