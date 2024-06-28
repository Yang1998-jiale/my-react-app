/*
 * @Author: yjl
 * @Date: 2024-06-24 11:22:25
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 16:31:02
 * @Description: 描述
 */
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getBattleInfo } from "@/store/battle";
import { HexType } from "../util";
import { PopoverStatus } from "@/components/Popover";
import HexPopover from "./hex-popover";

interface Props {
  activeKeys: string[];
  onSelect: (key: string) => void;
}
export default function HexConter({ activeKeys, onSelect }: Props) {
  const { hex: hexList } = useSelector(getBattleInfo);
  const [hexName, setHexName] = useState<string | undefined>("");
  let [typeFlag, setTypeFlag] = useState<number | string>(1);

  const filterHex = useMemo(() => {
    return hexList.filter(
      (hex) => hex.type == typeFlag && hex.name.includes(hexName)
    );
  }, [typeFlag, hexName, hexList]);

  return (
    <div className="w-100% h-600px flex flex-col">
      <Input
        onChange={({ target: { value } }) => {
          setHexName(value);
        }}
        prefix={<SearchOutlined />}
        placeholder="请输入强化符文名称"
        className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
      />
      <div className="flex p-y-20px b-b-1px b-b-solid b-b-[rgba(255,255,255,.05)]">
        {HexType.map((type) => {
          return (
            <div
              key={type.key}
              onClick={() => {
                setTypeFlag(type.key);
              }}
              className={`w-33% text-center text-16px cursor-pointer  ${
                typeFlag === type.key ? "c-#f1f2f8" : "c-#4d5572"
              }`}
            >
              {type.label}
            </div>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className=" w-100% flex  flex-wrap p-y-16px">
          {filterHex.map((hex) => {
            return (
              <PopoverStatus
                key={hex.id}
                rootClassName={"chess-popover"}
                className="w-12.5% "
                content={<HexPopover hexInfo={hex} />}
              >
                <div
                  className={`flex flex-col items-center  m-b-10px cursor-pointer ${
                    activeKeys.includes(hex.id) ? "opacity-45" : ""
                  }`}
                  onClick={() => {
                    if (activeKeys.includes(hex.id)) return;
                    onSelect(hex.id);
                  }}
                >
                  <div className="w-54px h-54px b-rd-50% flex items-center justify-center b-1px b-solid b-#212744 bg-#161b35   ">
                    <img
                      src={hex.imgUrl}
                      className="w-42px h-42px b-rd-50%"
                      alt=""
                    />
                  </div>
                  <span className=" inline-block text-center c-#4d5572">
                    {hex.name}
                  </span>
                </div>
              </PopoverStatus>
            );
          })}
        </div>
      </div>
    </div>
  );
}
