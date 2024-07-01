/*
 * @Author: yjl
 * @Date: 2024-06-24 11:34:18
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-01 10:59:27
 * @Description: 描述
 */
import EquipAnalyse from "../component/equip-analyse";
import HexAnalyse from "../component/hex-analyse";
import PriorityStars from "../component/priority-stars";

export default function Right() {
  return (
    <>
      <div className="w-32% h-100% flex-shrink-0  flex flex-col flex-shrink-0">
        <EquipAnalyse />
        <HexAnalyse />
        <PriorityStars />
      </div>
    </>
  );
}
