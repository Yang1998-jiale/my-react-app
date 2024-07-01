/*
 * @Author: yjl
 * @Date: 2024-07-01 10:23:02
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-01 16:12:54
 * @Description: 描述
 */
import { useState, useMemo } from "react";
import BoxTitle from "./box-title";
import SelectBox from "./select-box";
import BattleModal from "@/components/Modal/BattleModal";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";
import { useBattle, getHeroInfo } from "../util";
import ChessConter from "../modal/chess-conter";
import { message } from "antd";

export default function PriorityStars() {
  const [chessModalOpen, setChessModalOpen] = useState<boolean>(false);
  const { chess: chessList } = useSelector(getBattleInfo);
  const { finalHeroList, setFinalHeroList, analyseData, setAnalyseData } =
    useBattle();
  const { priorityStars } = analyseData;

  const targetChessList = useMemo(() => {
    let targetIds = Array.from(
      new Set(finalHeroList.map((item) => item.heroID))
    );
    return chessList.filter((item) => targetIds.includes(item.id));
  }, [finalHeroList, chessList]);

  function selectChess(heroID) {
    setAnalyseData((state) => {
      state.priorityStars = heroID;
      if (heroID.length < 3) {
        let len = 3 - heroID.length;
        state.priorityStars.push(...Array(len).fill(""));
      }
      return {
        ...state,
      };
    });
    setFinalHeroList((state) => {
      return state.map((item) => {
        if (heroID.includes(item.heroID)) {
          item.isChosen = true;
        } else {
          item.isChosen = false;
        }
        return {
          ...item,
        };
      });
    });
    setChessModalOpen(false);
  }

  function deleteHero(index) {
    setAnalyseData((state) => {
      state.priorityStars.splice(index, 1);
      state.priorityStars.push("");

      return {
        ...state,
      };
    });
  }

  return (
    <>
      <div className="w-100% !p-b-30px right-box">
        <BoxTitle title="优先三星" />
        <div className="flex m-t-24px">
          {priorityStars.map((item, index) => {
            return (
              <SelectBox
                key={index}
                selectInfo={getHeroInfo(item, chessList)}
                deleteCbk={() => {
                  deleteHero(index);
                }}
                isRadius={true}
                isDelete={true}
                showModal={() => {
                  if (!finalHeroList.length) {
                    message.warning("请选放置英雄再选择优选三星");
                    return;
                  }
                  setChessModalOpen(true);
                }}
                className="m-r-10px"
              />
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
            activeKeys={priorityStars.map((item) => item)}
            activeNum={3}
          />
        </BattleModal>
      </div>
    </>
  );
}
