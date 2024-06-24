/*
 * @Author: yjl
 * @Date: 2024-06-24 11:51:09
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-24 13:50:42
 * @Description: 描述
 */

import BoxTitle from "./box-title";
export default function EquipAnalyse() {
  return (
    <>
      <div className="w-100% min-h-30% right-box">
        <BoxTitle
          title="装备分析"
          desc="*佩戴装备涉及转职装备，将合并统计羁绊数量"
        />
        {/* 抢装顺序 */}
        <div></div>
      </div>
    </>
  );
}
