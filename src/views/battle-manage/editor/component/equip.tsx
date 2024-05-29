/*
 * @Author: yjl
 * @Date: 2024-05-09 22:46:45
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-29 13:50:39
 * @Description: 描述
 */

import { Input } from "antd";
// import Content from "./popover-content";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getGroupByKey } from "@/utils/index";
import { Popover } from "antd";
import Content from "./popover-content";
import { EquipType } from "../util";
import type { Tabs } from "@/types/battle";

export default function Equip({ equipList }) {
  const groupEquip = getGroupByKey(equipList, "type");
  const [formState, setFormState] = useState<{
    keyword: string | undefined;
    activeKey: number | undefined | string;
  }>({
    keyword: undefined,
    activeKey: 1,
  });
  const [equipInfo, setEquipInfo] = useState<any>([]);
  function tabChange(record: Tabs) {
    setFormState({ keyword: undefined, activeKey: record.value });
  }

  useEffect(() => {
    const { keyword, activeKey } = formState;
    let filterEquip = equipList;
    if (keyword) {
      filterEquip = equipList.filter(
        (item) =>
          item.name.indexOf(keyword) != -1 ||
          item.keywords.indexOf(keyword) != -1
      );
    }
    if (activeKey) {
      filterEquip =
        groupEquip.find((item) => activeKey == item.type)?.value || [];
    }
    setEquipInfo(filterEquip);
    console.log(filterEquip);
  }, [equipList, formState, groupEquip]);

  return (
    <div className="w-100% h-100% flex flex-col relative ">
      <div className="sticky top-0 left-0 ">
        <Input
          onChange={({ target: { value } }:React.ChangeEvent<HTMLInputElement>) => {
            setFormState({ activeKey: value ? undefined : 1, keyword: value });
          }}
          prefix={<SearchOutlined />}
          placeholder="请输入装备名称"
          value={formState.keyword}
          className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
        />
        <div className="flex flex-wrap m-y-16px">
          {EquipType.map((item) => {
            return (
              <div
                key={item.value}
                style={
                  formState.activeKey === item.value
                    ? {
                        background: "#c174e8",
                        color: "#fff",
                        border: "1px solid #c174e8",
                      }
                    : {}
                }
                onClick={() => tabChange(item)}
                className="p-x-10px p-y-4px c-[rgba(239,242,245,.3)] b-1px b-solid b-[rgba(239,242,245,.2)] m-r-8px m-b-8px b-rd-4px hover-c-#fff cursor-pointer hover-b-[#c174e8] hover-bg-#c174e8"
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 w-100% overflow-y-auto left-box">
        {equipInfo.map((item) => {
          return (
            <Popover
              rootClassName={"chess-popover"}
              key={item.id}
              content={
                <Content
                  type="equip"
                  info={item}
                  baseInfo={groupEquip[0].value}
                />
              }
            >
              <img
                src={item.imagePath}
                className="w-44px h-44px m-r-8px m-b-8px cursor-pointer"
                alt=""
              />
            </Popover>
          );
        })}
      </div>
    </div>
  );
}
