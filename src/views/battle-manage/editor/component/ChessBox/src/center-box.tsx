/*
 * @Author: yjl
 * @Date: 2024-05-22 16:44:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-24 18:13:47
 * @Description: 描述
 */

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
import { getBattleInfo } from "@/store/battle";
import { useSelector } from "react-redux";
import { useBattle } from "@/views/battle-manage/editor/index";

export default function CenterBox({ info, index }) {
  const { deleteHero } = useBattle();
  const { chess: chessList } = useSelector(getBattleInfo);
  const detail = chessList.find((item) => item.id == info.heroID);

  return (
    <>
      <div
        onDrop={() => {}}
        className={`chess-box ${detail?.price ? "price-" + detail.price : ""}`}
        onClick={() => {
          deleteHero(info);
        }}
        onDrag={() => {}}
      >
        <i
          data-index={index}
          className="w-100% h-100% bg-img "
          style={{ background: `url(${minUrl + detail?.name})` }}
        ></i>
      </div>
    </>
  );
}
