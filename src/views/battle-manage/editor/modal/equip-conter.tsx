/*
 * @Author: yjl
 * @Date: 2024-06-20 10:45:56
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-24 11:37:20
 * @Description: 描述
 */
import { useEffect, useMemo, useState } from "react";
import { getGroupByKey } from "@/utils/index";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { EquipType } from "../util";
import { PopoverStatus } from "@/components/Popover";
import Content from "../component/popover-content";

interface Props {
  type: string;
  onSelect: (equipID: string | undefined, equipInfo?: any) => void;
}
export default function EquipConter({ type = "all", onSelect }: Props) {
  const { equip: equipList } = useSelector(getBattleInfo);
  const [equipName, setEquipName] = useState<string | undefined>("");

  const equipGroup = useMemo(() => {
    let filterList = equipList;
    if (equipName) {
      filterList = equipList.filter((item) => item.name.includes(equipName));
    }

    const groupEquipList = getGroupByKey(filterList, "type");
    if (type == "all") {
      return groupEquipList;
    }
    return groupEquipList.filter((item) => item.type === type);
  }, [type, equipList, equipName]);

  const baseEquip = getGroupByKey(equipList, "type");

  function getGroupName(type) {
    return EquipType.find((item) => item.value === Number(type))?.label || "--";
  }

  return (
    <>
      <div className="w-100% h-600px overflow-y-auto">
        <div>
          <Input
            onChange={({ target: { value } }) => {
              setEquipName(value);
            }}
            prefix={<SearchOutlined />}
            placeholder="请输入装备名称"
            className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
          />
        </div>
        <div>
          {equipGroup.map((group) => {
            return (
              <div key={group.type}>
                <div className="equip-group m-b-16px m-t-8px">
                  <span>{getGroupName(group.type)}</span>
                </div>
                <div className="w-100% flex items-center flex-wrap">
                  {group.value.map((equip) => {
                    return (
                      <PopoverStatus
                        rootClassName={"chess-popover"}
                        key={equip.id}
                        content={
                          <Content
                            type="equip"
                            info={equip}
                            baseInfo={baseEquip[0].value}
                          />
                        }
                      >
                        <img
                          src={equip.imagePath}
                          className="w-44px h-44px m-r-8px m-b-8px cursor-pointer"
                          alt=""
                          onClick={() => {
                            onSelect(equip.id, equip);
                          }}
                        />
                      </PopoverStatus>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
