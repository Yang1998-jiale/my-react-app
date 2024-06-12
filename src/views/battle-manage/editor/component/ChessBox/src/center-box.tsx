/*
 * @Author: yjl
 * @Date: 2024-05-22 16:44:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-12 16:43:12
 * @Description: 描述
 */

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useBattle } from "@/views/battle-manage/editor/util";
import type { Chess } from "@/types/battle";
interface Props {
  info: Chess;
  index: number;
  positonKey: number;
}
export default function CenterBox({ info, index, positonKey = 0 }: Props) {
  const { dropChessPosition, dropReplaceChess } = useBattle();
  const { chess: chessList } = useSelector(getBattleInfo);
  const detail = chessList.find((item) => item.id == info.heroID);

  function dropFn(e: React.DragEvent) {
    // console.log(e);
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

  function ondragstart(e: React.DragEvent<HTMLDivElement>) {
    const dt = e.dataTransfer;
    dt.setData("chessXY", info.position[positonKey] as string);
    dt.setData("action", "update");
  }

  return (
    <>
      <div
        onDrop={(e) => {
          dropFn(e);
        }}
        onDragStart={(e) => {
          ondragstart(e);
        }}
        draggable="true"
        className={`chess-box ${detail?.price ? "price-" + detail.price : ""}`}
        onClick={() => {
          // deleteHero(info);
        }}
      >
        <i
          className="w-100% h-100% bg-img "
          style={{ background: `url(${minUrl + detail?.name})` }}
        ></i>
      </div>
    </>
  );
}
