/*
 * @Author: yjl
 * @Date: 2024-06-28 14:26:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-28 14:38:19
 * @Description: 描述
 */
import { memo } from "react";

interface Props {
  hexInfo: any;
}
function Center({ hexInfo }: Props) {
  return (
    <div className="w-400px  c-#fff p-20px flex items-center flex-wrap">
      <div className="w-54px h-54px b-rd-50% flex items-center justify-center b-1px b-solid b-#212744 bg-#161b35 flex-shrink-0 ">
        <img src={hexInfo.imgUrl} className="w-42px h-42px b-rd-50%" alt="" />
      </div>
      <span className="flex-1 p-x-16px text-16px ">{hexInfo.name}</span>
      <div className="m-t-16px text-16px c-#606e8c w-100%">{hexInfo.description}</div>
    </div>
  );
}
const HexPopover = memo(Center);

export default HexPopover;
