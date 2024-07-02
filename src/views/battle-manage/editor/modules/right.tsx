/*
 * @Author: yjl
 * @Date: 2024-06-24 11:34:18
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-02 10:34:16
 * @Description: 描述
 */
import EquipAnalyse from "../component/equip-analyse";
import HexAnalyse from "../component/hex-analyse";
import PriorityStars from "../component/priority-stars";
import AlternateHero from "../component/alternate-hero";

export default function Right() {
  return (
    <>
      <div className="w-32% h-100% flex-shrink-0  flex flex-col flex-shrink-0">
        <EquipAnalyse />
        <HexAnalyse />
        <PriorityStars />
        <AlternateHero />
      </div>
    </>
  );
}
