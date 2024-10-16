/*
 * @Author: yjl
 * @Date: 2024-06-24 11:51:09
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-05 17:16:26
 * @Description: 描述
 */

import BoxTitle from "./box-title";
import { useBattle, getEquipInfo, getHeroInfo } from "../util";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { getBattleInfo } from "@/store/battle";
import BattleModal from "@/components/Modal/BattleModal";
import EquipConter from "../modal/equip-conter";
import SelectItem from "./select-box";
import ChessConter from "../modal/chess-conter";

export default function EquipAnalyse() {
  const {
    analyseData: { robEquip },
    setAnalyseData,
    finalHeroList,
    setFinalHeroList,
    // setTarget,
  } = useBattle();
  const { equip: equipList, chess: chessList } = useSelector(getBattleInfo);
  const [equipModalOpen, setEquipModalOpen] = useState<boolean>(false);
  const [chessModalOpen, setChessModalOpen] = useState<boolean>(false);
  const [equipModalType, setEquipModalType] = useState<string>("all");

  const chessInfo = useMemo(() => {
    let carryChess = finalHeroList.find((item) => item.isCarry) || {};
    let equipChess =
      finalHeroList.filter((item) => {
        return (
          item.equipID.slice(0, 3).some((s) => s) &&
          item.chessID !== carryChess.chessID
        );
      }) || [];
    return { carryChess, equipChess };
  }, [finalHeroList]);

  const targetChessList = useMemo(() => {
    return (
      chessInfo.equipChess.map((item) => {
        return {
          ...item,
          ...chessList.find((f) => f.id == item.heroID),
        };
      }) || []
    );
  }, [chessInfo.equipChess, chessList]);

  function showEquipModal(type: string) {
    setEquipModalType(type);
    setEquipModalOpen(true);
  }

  function deleteEquip(index, _equipID) {
    setAnalyseData((state) => {
      state.robEquip.splice(index, 1);
      state.robEquip.push("");

      return {
        ...state,
      };
    });
  }

  function selectEquip(equipID) {
    if (equipModalType == "all") {
      let findIndex = chessInfo.carryChess.equipID.findIndex((item) => !item);
      const equipData = getEquipInfo(equipID, equipList);
      const carryChess = getHeroInfo(chessInfo.carryChess.heroID, chessList);
      if (
        Number(equipData.raceId) &&
        (carryChess.raceIds.includes(equipData.raceId) ||
          chessInfo.carryChess.equipID.includes(equipData.id))
      ) {
        message.error("拥有相同羁绊的英雄无法穿戴该装备");
        return;
      }
      if (
        Number(equipData.jobId) &&
        (carryChess.jobIds.includes(equipData.jobId) ||
          chessInfo.carryChess.equipID.includes(equipData.id))
      ) {
        message.error("拥有相同羁绊的英雄无法穿戴该装备");
        return;
      }

      chessInfo.carryChess.equipID[findIndex] = equipID;

      setFinalHeroList((state) => {
        return state.map((item) => {
          if (item.chessID === chessInfo.carryChess.chessID) {
            return chessInfo.carryChess;
          }
          return item;
        });
      });
    } else if (equipModalType == "1") {
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
    }

    setEquipModalOpen(false);
  }

  function selectChess(keys) {
    setFinalHeroList((state) => {
      return state.map((item) => {
        if (item.chessID === keys[0]) {
          item.isCarry = true;
        }
        return item;
      });
    });
    setChessModalOpen(false);
  }

  function deleteCarryHero(chess) {
    setFinalHeroList((state) => {
      return state.map((item) => {
        if (item.chessID === chess.chessID) {
          item.isCarry = false;
        }
        return item;
      });
    });
  }

  function delectCarryEquip(index) {
    chessInfo.carryChess.equipID.splice(index, 1);
    chessInfo.carryChess.equipID.push("");
    setFinalHeroList((state) => {
      return state.map((item) => {
        if (item.chessID === chessInfo.carryChess.chessID) {
          return chessInfo.carryChess;
        }
        return item;
      });
    });
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
                  <SelectItem
                    selectInfo={getEquipInfo(item, equipList)}
                    showModal={() => {
                      showEquipModal("1");
                    }}
                    deleteCbk={(equipID) => {
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
        {/* 主C装备 */}
        <div className="flex items-center m-y-16px">
          <span className="c-#fff m-r-16px">主C装备</span>
          <SelectItem
            selectInfo={getHeroInfo(chessInfo.carryChess?.heroID, chessList)}
            showModal={() => {
              if (!chessInfo.equipChess.length) {
                message.warning("请先给英雄分配装备，才能成为主C英雄哦备");
                return;
              }
              setChessModalOpen(true);
            }}
            deleteCbk={() => {
              deleteCarryHero(chessInfo.carryChess);
            }}
            isRadius={true}
          />
          <span className="c-#4e5672 m-x-16px">必备</span>
          {[0, 1].map((item) => {
            return (
              <SelectItem
                className="m-r-10px"
                key={item}
                deleteCbk={() => {
                  delectCarryEquip(item);
                }}
                showModal={() => {
                  showEquipModal("all");
                }}
                selectInfo={
                  chessInfo.carryChess.equipID
                    ? getEquipInfo(
                        chessInfo.carryChess.equipID[item],
                        equipList
                      )
                    : undefined
                }
              />
            );
          })}
          <span className="c-#4e5672 m-x-16px">备选</span>
          {[2, 3, 4].map((item) => {
            return (
              <SelectItem
                className="m-r-10px"
                key={item}
                deleteCbk={() => {
                  delectCarryEquip(item);
                }}
                showModal={() => {
                  showEquipModal("all");
                }}
                selectInfo={
                  chessInfo.carryChess.equipID
                    ? getEquipInfo(
                        chessInfo.carryChess.equipID[item],
                        equipList
                      )
                    : undefined
                }
              />
            );
          })}
        </div>

        {/* 其他英雄装备 */}
        {chessInfo.equipChess.length ? (
          <div className="flex items-center flex-wrap">
            <span className="c-#fff m-r-16px flex-shrink-0">抢装顺序</span>
            {chessInfo.equipChess.map((chess, heroIndex) => {
              return (
                <div
                  className="flex items-center m-r-16px m-b-12px"
                  key={chess.heroID + "_" + heroIndex}
                >
                  <SelectItem
                    selectInfo={getHeroInfo(chess.heroID, chessList)}
                    isRadius={true}
                    isDelete={false}
                  />
                  <RightOutlined className="m-x-10px c-#4e5672" />
                  {chess.equipID.map((equipID, index) => {
                    return (
                      equipID && (
                        <SelectItem
                          isDelete={false}
                          className="m-r-6px"
                          key={index + "_" + equipID}
                          selectInfo={getEquipInfo(equipID, equipList)}
                        />
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : null}

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

        <BattleModal
          footer={null}
          open={chessModalOpen}
          title="英雄"
          width="700px"
          centered
          destroyOnClose={true}
          onCancel={() => {
            setChessModalOpen(false);
          }}
        >
          <ChessConter chessList={targetChessList} onSelect={selectChess} />
        </BattleModal>
      </div>
    </>
  );
}
