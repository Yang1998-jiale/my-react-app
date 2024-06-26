/*
 * @Author: yjl
 * @Date: 2024-06-24 11:51:09
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-26 18:05:32
 * @Description: 描述
 */

import BoxTitle from "./box-title";
import { useBattle } from "../util";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { getBattleInfo } from "@/store/battle";
import BattleModal from "@/components/Modal/BattleModal";
import EquipConter from "../modal/equip-conter";

export default function EquipAnalyse() {
  const {
    analyseData: { robEquip },
    setAnalyseData,
  } = useBattle();
  const { equip: equipList } = useSelector(getBattleInfo);
  const [equipModalOpen, setEquipModalOpen] = useState<boolean>(false);
  const [equipModalType, setEquipModalType] = useState<string>("all");
  function getEquipInfo(equipID) {
    if (!equipID) {
      return;
    }
    return equipList.find((item) => item.id === equipID);
  }

  function showEquipModal(type: string) {
    console.log(type);
    setEquipModalType(type);
    setEquipModalOpen(true);
  }

  function deleteEquip(index, equipID) {
    console.log(index, equipID);
  }

  function selectEquip(equipID) {
    setAnalyseData((state) => {
      let robEquip = [...state.robEquip];
      let findIndex = state.robEquip.findIndex((item) => !item);
      if (findIndex != -1) {
        robEquip[findIndex] = equipID;
      }
      return {
        ...state,
        robEquip: robEquip,
      };
    });
    setEquipModalOpen(false);
  }

  return (
    <>
      <div className="w-100% min-h-30% right-box">
        <BoxTitle
          title="装备分析"
          desc="*佩戴装备涉及转职装备，将合并统计羁绊数量"
        />
        {/* 抢装顺序 */}
        <div className="flex items-center m-y-16px">
          <span className="c-#fff m-r-16px">抢装顺序</span>
          <div className="flex items-center">
            {robEquip.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <EquipBoxMemo
                    equipInfo={getEquipInfo(item)}
                    showEquipModal={() => {
                      showEquipModal("1");
                    }}
                    deleteEquip={(equipID) => {
                      deleteEquip(index, equipID);
                    }}
                  />
                  {index !== robEquip.length - 1 && (
                    <RightOutlined className="m-x-10px c-#4e5672" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

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
          <EquipConter type={equipModalType} onSelect={selectEquip} />
        </BattleModal>
      </div>
    </>
  );
}
interface EquipBoxProps {
  equipInfo: any;
  showEquipModal: () => void;
  deleteEquip: (equipID?: string | undefined, equipInfo?: any) => void;
}
function EquipBox({ equipInfo, deleteEquip, showEquipModal }: EquipBoxProps) {
  return (
    <>
      {equipInfo ? (
        <div className="inline-block vertical-middle w-40px h-40px  cursor-pointer relative b-rd-4px bg-#1a1f3a b-1px b-solid b-#23294a">
          <div
            className="w-16px h-16px b-rd-50% bg-red absolute top-0 right-0 translate-[30%,-30%] flex justify-center items-center c-#fff font-700"
            onClick={() => {
              deleteEquip(equipInfo);
            }}
          >
            <div className="w-50% h-2px bg-#fff"></div>
          </div>
          <img src={equipInfo?.imagePath} className="w-100% h-100%" alt="" />
        </div>
      ) : (
        <div
          className="inline-block vertical-middle w-40px h-40px flex cursor-pointer justify-center items-center text-20px line-height-40px  c-#242947 font-700 b-rd-4px bg-#1a1f3a b-1px b-solid b-#23294a"
          onClick={() => {
            showEquipModal();
          }}
        >
          <PlusOutlined />
        </div>
      )}
    </>
  );
}

const EquipBoxMemo = memo(EquipBox);
