/*
 * @Author: yjl
 * @Date: 2024-06-20 13:37:25
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-20 14:45:07
 * @Description: 描述
 */
import { memo } from "react";
function EquipBox({ equipInfo }) {
  return (
    <>
      {equipInfo ? (
        <div className="b-1px b-solid b-#333854 w-18px h-18px flex items-center justify-center bg-#11162e">
          <img src={equipInfo.imagePath} className="w-100% h-100%" alt="" />
        </div>
      ) : (
        <div className="b-1px b-solid b-#333854 w-18px h-18px  flex items-center justify-center bg-#11162e c-#333854 font-700 text-center line-height-loose">
          <span className="">+</span>
        </div>
      )}
    </>
  );
}
const EquipItem = memo(EquipBox);
export default EquipItem;
