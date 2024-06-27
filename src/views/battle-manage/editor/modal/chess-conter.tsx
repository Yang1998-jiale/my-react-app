/*
 * @Author: yjl
 * @Date: 2024-06-20 10:45:31
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-27 18:01:43
 * @Description: 描述
 */
import { chessFormart } from "../util";
import { PopoverStatus } from "@/components/Popover";
import Content from "./popover-content";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";

const baseURl = import.meta.env.VITE_APP_BASE_URL;
const minUrl = baseURl + "act/img/tft/champions/";
interface Props {
  chessList: any[];
  activeKeys?: any[];
  activeNum?: number;
  onSelect: (keys: string[]) => void;
}
export default function ChessConter({
  chessList,
  activeKeys = [],
  activeNum = 1,
  onSelect = () => {},
}: Props) {
  const [chessName, setChessName] = useState<string | undefined>("");
  const [activeChess, setActiveChess] = useState<string[]>(activeKeys);
  const chessGroup = useMemo(() => {
    return chessFormart(
      chessList.filter((item) => item.name.includes(chessName)) || []
    );
  }, [chessList, chessName]);

  // useEffect(() => {
  //   setActiveChess(() => activeKeys.map((item) => item.name));
  // }, [activeKeys]);
  return (
    <div className="w-100% h-600px  flex flex-col">
      <div className="flex-shrink-0">
        <Input
          onChange={({ target: { value } }) => {
            setChessName(value);
          }}
          prefix={<SearchOutlined />}
          placeholder="请输入装备名称"
          className="b-rd-40px !bg-#121831 b-#2f3555 !hover-bg-#121831 !hover-b-#ce78f9 !c-#fff input-item"
        />
      </div>
      <div className="m-t-16px flex-1 overflow-y-auto">
        {chessGroup.map((group) => {
          return (
            <div key={group.price}>
              <div className="equip-group m-b-16px m-t-8px">
                <span>{group.price + "费"}</span>
              </div>
              <div className="flex flex w-100% flex-wrap">
                {group.chessList.map((item) => {
                  return (
                    <PopoverStatus
                      content={<Content info={item} type={"chess"} />}
                      rootClassName={"chess-popover"}
                      key={item.id}
                    >
                      <div
                        className={`relative`}
                        onClick={() => {
                          if (activeChess.includes(item.id)) {
                            return;
                          }
                          setActiveChess((state) => {
                            if (state.length < activeNum) {
                              return [...state, item.id];
                            }
                            state.shift();
                            state.push(item.id);
                            return [...state];
                          });
                        }}
                      >
                        <img
                          draggable="true"
                          src={minUrl + item.name}
                          className={`w-50px h-50px m-r-8px m-b-8px cursor-pointer price-bd ${
                            item.price ? "price-bd-" + item.price : ""
                          }`}
                          alt=""
                        />
                        {activeChess.includes(item.id) && (
                          <div className="w-22px h-22px b-rd-50% absolute b-1px b-solid b-#5d4f30 bg-#101317 c-#fff5e0 text-center line-height-19px top-0 right-0 translate-[0%,-30%]">
                            1
                          </div>
                        )}
                      </div>
                    </PopoverStatus>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-100% text-center">
        <div
          className="inline-flex items-center cursor-pointer justify-center w-136px h-40px !b-rd-3px !bg-transparent c-#f1f2f8 !hover-b-[#c174e8] !hover-c-#c174e8 b-1px b-solid"
          onClick={() => {
            onSelect(activeChess);
          }}
        >
          确认
        </div>
      </div>
    </div>
  );
}
