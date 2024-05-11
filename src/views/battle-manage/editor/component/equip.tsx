/*
 * @Author: yjl
 * @Date: 2024-05-09 22:46:45
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-11 10:09:59
 * @Description: 描述
 */

import { Input } from "antd";
// import Content from "./popover-content";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getGroupByKey } from "@/utils/index";
//装备组件
const EquipType = [
  {
    label: "基础装备",
    value: 1,
  },
  {
    label: "合成装备",
    value: 2,
  },
  {
    label: "光明装备",
    value: 3,
  },
  {
    label: "特殊装备",
    value: 4,
  },
  {
    label: "转职纹章",
    value: 5,
  },
  {
    label: "奥恩神器",
    value: 6,
  },
  {
    label: "金鳞龙装备",
    value: 7,
  },
  {
    label: "辅助装备",
    value: 8,
  },
];
export default function Equip({ equipList }) {
  const [formState, setFormState] = useState<{
    keyword: string | undefined;
    activeKey: number;
  }>({
    keyword: undefined,
    activeKey: 1,
  });
  console.log(getGroupByKey(equipList, "type"));

  return (
    <div className="h-100% overflow-auto left-box">
      <div className="sticky top-0 left-0 ">
        <Input
          onChange={({ target: { value } }) => {
            setFormState({ ...formState, keyword: value });
          }}
          prefix={<SearchOutlined />}
          placeholder="请输入装备名称"
          value={formState.keyword}
          className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
        />
      </div>
      <div>
        {EquipType.map((item) => {
          return <div key={item.value}>{item.label}</div>;
        })}
      </div>
    </div>
  );
}
