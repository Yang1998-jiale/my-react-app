/*
 * @Author: yjl
 * @Date: 2024-06-20 10:45:56
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-21 17:52:45
 * @Description: 描述
 */
import { useEffect, useMemo } from "react";
import { getGroupByKey } from "@/utils/index";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";
// import { EquipType } from "../util";

interface Props {
  type: string;
}
export default function EquipConter({ type = "all" }: Props) {
  const { equip: equipList } = useSelector(getBattleInfo);
  const equipGroup = useMemo(() => {
    const groupEquipList = getGroupByKey(equipList, "type");
    if (type == "all") {
      return groupEquipList;
    }
    return groupEquipList.filter((item) => item.type === type);
  }, [type, equipList]);

  useEffect(() => {
    console.log(equipGroup);
  }, [equipGroup]);
  return (
    <>
      <div className="w-100% h-600px overflow-y-auto"></div>
    </>
  );
}
