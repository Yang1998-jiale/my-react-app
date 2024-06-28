/*
 * @Author: yjl
 * @Date: 2024-06-24 11:34:18
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 10:12:24
 * @Description: 描述
 */
import EquipAnalyse from "../component/equip-analyse";
import HexAnalyse from "../component/hex-analyse";

export default function Right() {
  return (
    <>
      <div className="w-32% h-100% flex-shrink-0  flex flex-col flex-shrink-0">
        <EquipAnalyse />
        <HexAnalyse />
      </div>
    </>
  );
}
