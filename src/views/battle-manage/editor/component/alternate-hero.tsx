/*
 * @Author: yjl
 * @Date: 2024-07-02 10:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-05 17:51:08
 * @Description: 描述
 */

import BoxTitle from "./box-title";
import { useBattle, getHeroInfo, createAlternative } from "../util";
import {  useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";
import SelectItem from "./select-box";
import { RightOutlined } from "@ant-design/icons";
import BattleModal from "@/components/Modal/BattleModal";
import ChessConter from "../modal/chess-conter";

export default function AlternateHero() {
  const { chess: chessList } = useSelector(getBattleInfo);
  const {
    analyseData: { alternativeList },
    setAnalyseData,
    finalHeroList,
    // setTarget,
  } = useBattle();
  const [chessModalOpen, setChessModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"orginChess" | "alternativeChess">(
    "orginChess"
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const targetChessList = useMemo(() => {
    if (modalType == "orginChess") {
      const heroIDList = finalHeroList
        .filter((item) => item.chessType == "hero")
        .map((item) => item.heroID);
      const heroIDs = Array.from(new Set(heroIDList));
      return chessList.filter((item) => heroIDs.includes(item.id));
    }
    return chessList;
  }, [finalHeroList, chessList, modalType]);


  function addAlternative() {
    if (alternativeList.length >= 4) {
      return;
    }
    setAnalyseData((state) => {
      return {
        ...state,
        alternativeList: [...state.alternativeList, createAlternative()],
      };
    });
  }

  function selectChess(heroIDs) {
    setAnalyseData((state) => {
      alternativeList[activeIndex][modalType] = heroIDs;
      return {
        ...state,
        alternativeList,
      };
    });
    setChessModalOpen(false);
  }

  function deleteChess(pIndex, target, index) {
    setAnalyseData((state) => {
      if (alternativeList[pIndex][target].length == 2) {
        alternativeList[pIndex][target].splice(index, 1);
      } else {
        alternativeList[pIndex][target] = [""];
      }
      return {
        ...state,
        alternativeList,
      };
    });
  }

  return (
    <>
      <div className="w-100% !p-b-30px right-box">
        <BoxTitle title="备选英雄">
          <div
            className="c-#f1f2f8 b-1px b-solid b-#f1f2f8 p-x-12px p-y-2px b-rd-4px cursor-pointer"
            onClick={() => {
              addAlternative();
            }}
          >
            新增
          </div>
        </BoxTitle>
        <div className="m-t-24px flex flex-wrap items-center">
          {alternativeList.map((item, index) => {
            return (
              <div key={index} className="flex items-center m-r-24px m-b-16px">
                {item.orginChess.map((o, i) => {
                  return (
                    <SelectItem
                      className={`${i == 1 ? "m-l-10px" : ""}`}
                      key={"orgin" + i + o}
                      selectInfo={o ? getHeroInfo(o, chessList) : undefined}
                      isRadius={true}
                      isDelete={true}
                      deleteCbk={() => {
                        deleteChess(index, "orginChess", i);
                      }}
                      showModal={() => {
                        setModalType("orginChess");
                        setChessModalOpen(true);
                        setActiveIndex(index);
                      }}
                    />
                  );
                })}
                <RightOutlined className="m-x-10px c-#4e5672" />
                {item.alternativeChess.map((o, i) => {
                  return (
                    <SelectItem
                      className={`${i == 1 ? "m-l-10px" : ""}`}
                      key={"alternative" + i + o}
                      selectInfo={o ? getHeroInfo(o, chessList) : undefined}
                      isRadius={true}
                      isDelete={true}
                      deleteCbk={() => {
                        deleteChess(index, "alternativeChess", i);
                      }}
                      showModal={() => {
                        setModalType("alternativeChess");
                        setChessModalOpen(true);
                        setActiveIndex(index);
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
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
          <ChessConter
            chessList={targetChessList}
            onSelect={selectChess}
            activeNum={2}
          />
        </BattleModal>
      </div>
    </>
  );
}
